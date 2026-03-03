package com.mohit.portfolio.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.mohit.portfolio.model.ContactMessage;
import com.mohit.portfolio.service.ChatService;
import com.mohit.portfolio.service.ContentService;
import com.mohit.portfolio.service.EmailService;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private ContentService contentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ChatService chatService;

    @GetMapping("/profile")
    public ResponseEntity<JsonNode> getProfile() throws IOException {
        return ResponseEntity.ok(contentService.getProfile());
    }

    @GetMapping("/resume")
    public ResponseEntity<JsonNode> getResume() throws IOException {
        return ResponseEntity.ok(contentService.getResume());
    }

    @GetMapping("/projects")
    public ResponseEntity<JsonNode> getProjects() throws IOException {
        return ResponseEntity.ok(contentService.getProjects());
    }

    @GetMapping("/experiences")
    public ResponseEntity<JsonNode> getExperiences() throws IOException {
        return ResponseEntity.ok(contentService.getExperiences());
    }

    @GetMapping("/certificates")
    public ResponseEntity<JsonNode> getCertificates() throws IOException {
        return ResponseEntity.ok(contentService.getCertificates());
    }

    @GetMapping("/events")
    public ResponseEntity<JsonNode> getEvents() throws IOException {
        return ResponseEntity.ok(contentService.getEvents());
    }

    @GetMapping("/publications")
    public ResponseEntity<JsonNode> getPublications() throws IOException {
        return ResponseEntity.ok(contentService.getPublications());
    }

    @GetMapping("/contact-info")
    public ResponseEntity<JsonNode> getContactInfo() throws IOException {
        return ResponseEntity.ok(contentService.getContact());
    }

    @GetMapping("/buymeacoffee")
    public ResponseEntity<JsonNode> getBuyMeACoffee() throws IOException {
        return ResponseEntity.ok(contentService.getBuyMeACoffee());
    }

    @GetMapping("/reads")
    public ResponseEntity<JsonNode> getReads() throws IOException {
        return ResponseEntity.ok(contentService.getReads());
    }

    @GetMapping("/posts")
    public ResponseEntity<JsonNode> getPosts() throws IOException {
        return ResponseEntity.ok(contentService.getPosts());
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactMessage message) {
        System.out.println("Contact form submission received:");
        System.out.println("Name: " + message.getName());
        System.out.println("Email: " + message.getEmail());
        System.out.println("Message: " + message.getMessage());
        System.out.println("Time: " + LocalDateTime.now());

        try {
            // Send email notification
            emailService.sendContactEmail(
                    message.getName(),
                    message.getEmail(),
                    message.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Thanks for reaching out! I'll get back to you soon.");
            response.put("timestamp", LocalDateTime.now().toString());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error processing contact form: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send message. Please try again or email directly.");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, String> body, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (!chatService.isConfigured()) {
            response.put("success", false);
            response.put("reply", "Chat is currently unavailable.");
            return ResponseEntity.status(503).body(response);
        }

        String clientIp = request.getRemoteAddr();
        if (chatService.isRateLimited(clientIp)) {
            response.put("success", false);
            response.put("reply", "Too many requests. Please wait a moment.");
            return ResponseEntity.status(429).body(response);
        }

        String message = body.getOrDefault("message", "").trim();
        if (message.isEmpty()) {
            response.put("success", false);
            response.put("reply", "Please enter a message.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String reply = chatService.chat(message);
            response.put("success", true);
            response.put("reply", reply);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Chat error: " + e.getMessage());
            response.put("success", false);
            response.put("reply", "Sorry, I encountered an error. Please try again.");
            return ResponseEntity.status(500).body(response);
        }
    }
}
