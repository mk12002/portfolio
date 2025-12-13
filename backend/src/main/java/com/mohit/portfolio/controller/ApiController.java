package com.mohit.portfolio.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.mohit.portfolio.model.ContactMessage;
import com.mohit.portfolio.service.ContentService;
import jakarta.validation.Valid;
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
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Thanks for reaching out! I'll get back to you soon.");
        response.put("timestamp", LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }
}
