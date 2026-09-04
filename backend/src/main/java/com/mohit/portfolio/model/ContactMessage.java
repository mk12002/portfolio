package com.mohit.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactMessage {

    // Bounded lengths so a caller can't submit oversized payloads, and so
    // user-controlled text can't bloat the outgoing email subject/body.
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name is too long")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email")
    @Size(max = 254, message = "Email is too long")
    private String email;

    @NotBlank(message = "Message is required")
    @Size(max = 5000, message = "Message is too long")
    private String message;
    
    public ContactMessage() {}
    
    public ContactMessage(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
