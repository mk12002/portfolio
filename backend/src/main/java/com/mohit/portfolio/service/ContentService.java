package com.mohit.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
public class ContentService {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public JsonNode getProfile() throws IOException {
        return readJsonFile("profile.json");
    }
    
    public JsonNode getResume() throws IOException {
        return readJsonFile("resume.json");
    }
    
    public JsonNode getProjects() throws IOException {
        return readJsonFile("projects.json");
    }
    
    public JsonNode getExperiences() throws IOException {
        return readJsonFile("experiences.json");
    }
    
    public JsonNode getCertificates() throws IOException {
        return readJsonFile("certificates.json");
    }
    
    public JsonNode getEvents() throws IOException {
        return readJsonFile("events.json");
    }
    
    public JsonNode getPublications() throws IOException {
        return readJsonFile("publications.json");
    }
    
    public JsonNode getContact() throws IOException {
        return readJsonFile("contact.json");
    }
    
    public JsonNode getBuyMeACoffee() throws IOException {
        return readJsonFile("buymeacoffee.json");
    }
    
    public JsonNode getReads() throws IOException {
        return readJsonFile("reads.json");
    }
    
    public JsonNode getPosts() throws IOException {
        return readJsonFile("posts.json");
    }
    
    private JsonNode readJsonFile(String filename) throws IOException {
        ClassPathResource resource = new ClassPathResource("content/" + filename);
        try (InputStream inputStream = resource.getInputStream()) {
            return objectMapper.readTree(inputStream);
        }
    }
}
