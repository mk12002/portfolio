package com.mohit.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Autowired
    private ContentService contentService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    // Simple rate limiting: IP -> last request timestamp
    private final ConcurrentHashMap<String, Long[]> rateLimitMap = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS_PER_MINUTE = 10;

    private String cachedContext = null;

    @PostConstruct
    public void init() {
        // Pre-load context on startup
        try {
            cachedContext = buildContext();
        } catch (Exception e) {
            System.err.println("Warning: Could not pre-load chat context: " + e.getMessage());
        }
    }

    public boolean isConfigured() {
        return geminiApiKey != null && !geminiApiKey.isEmpty();
    }

    public boolean isRateLimited(String clientIp) {
        long now = System.currentTimeMillis();
        Long[] timestamps = rateLimitMap.computeIfAbsent(clientIp, k -> new Long[MAX_REQUESTS_PER_MINUTE]);

        synchronized (timestamps) {
            // Find oldest slot
            int oldestIdx = 0;
            for (int i = 1; i < timestamps.length; i++) {
                if (timestamps[i] == null || timestamps[i] < timestamps[oldestIdx]) {
                    oldestIdx = i;
                }
            }

            // If oldest is within last minute, rate limited
            if (timestamps[oldestIdx] != null && (now - timestamps[oldestIdx]) < 60_000) {
                return true;
            }

            // Record this request
            timestamps[oldestIdx] = now;
            return false;
        }
    }

    private String buildContext() throws IOException {
        StringBuilder sb = new StringBuilder();

        sb.append("=== PROFILE ===\n");
        sb.append(contentService.getProfile().toString()).append("\n\n");

        sb.append("=== RESUME ===\n");
        sb.append(contentService.getResume().toString()).append("\n\n");

        // For projects, only include key fields to save tokens
        sb.append("=== PROJECTS ===\n");
        JsonNode projects = contentService.getProjects();
        if (projects.has("projects")) {
            for (JsonNode p : projects.get("projects")) {
                sb.append("- ").append(p.path("title").asText())
                        .append(" | ").append(p.path("category").asText())
                        .append(" | ").append(p.path("tagline").asText())
                        .append(" | Metric: ").append(p.path("metric").asText())
                        .append(" | Tags: ").append(p.path("tags").toString())
                        .append(" | Tech: ").append(p.path("techStack").toString())
                        .append(" | Description: ").append(p.path("description").asText())
                        .append("\n");
            }
        }
        sb.append("\n");

        sb.append("=== PUBLICATIONS ===\n");
        sb.append(contentService.getPublications().toString()).append("\n\n");

        sb.append("=== EXPERIENCE ===\n");
        sb.append(contentService.getExperiences().toString()).append("\n\n");

        sb.append("=== CERTIFICATES ===\n");
        sb.append(contentService.getCertificates().toString()).append("\n\n");

        sb.append("=== READS & BLOG POSTS ===\n");
        try {
            sb.append(contentService.getReads().toString()).append("\n");
        } catch (Exception e) {
            /* ignore if not available */ }
        try {
            sb.append(contentService.getPosts().toString()).append("\n");
        } catch (Exception e) {
            /* ignore if not available */ }

        return sb.toString();
    }

    public String chat(String userMessage) throws Exception {
        if (!isConfigured()) {
            return "Chat is currently unavailable. API key not configured.";
        }

        // Reload context if not cached
        if (cachedContext == null) {
            cachedContext = buildContext();
        }

        String systemPrompt = "You are Mohit Kumar's portfolio assistant on his cybersecurity portfolio website. "
                + "You answer questions about Mohit based ONLY on the provided data below. "
                + "Be concise, friendly, and professional. Use bullet points for lists. "
                + "If asked something not covered in the data, say you don't have that information. "
                + "Never make up facts. Mohit is a Cybersecurity Engineer specializing in AI for Security & Security for AI.\n\n"
                + "=== MOHIT'S PORTFOLIO DATA ===\n"
                + cachedContext;

        // Build Gemini API request
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                + geminiApiKey;

        ObjectNode requestBody = objectMapper.createObjectNode();

        // System instruction
        ObjectNode systemInstruction = objectMapper.createObjectNode();
        ObjectNode systemPart = objectMapper.createObjectNode();
        systemPart.put("text", systemPrompt);
        ArrayNode systemParts = objectMapper.createArrayNode();
        systemParts.add(systemPart);
        systemInstruction.set("parts", systemParts);
        requestBody.set("system_instruction", systemInstruction);

        // User message
        ArrayNode contents = objectMapper.createArrayNode();
        ObjectNode content = objectMapper.createObjectNode();
        content.put("role", "user");
        ArrayNode parts = objectMapper.createArrayNode();
        ObjectNode part = objectMapper.createObjectNode();
        part.put("text", userMessage);
        parts.add(part);
        content.set("parts", parts);
        contents.add(content);
        requestBody.set("contents", contents);

        // Generation config
        ObjectNode generationConfig = objectMapper.createObjectNode();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 1024);
        requestBody.set("generationConfig", generationConfig);

        // Make request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // Parse response
        JsonNode responseJson = objectMapper.readTree(response.getBody());
        JsonNode candidates = responseJson.path("candidates");
        if (candidates.isArray() && candidates.size() > 0) {
            return candidates.get(0).path("content").path("parts").get(0).path("text").asText();
        }

        return "I couldn't generate a response. Please try again.";
    }
}
