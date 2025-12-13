package com.mohit.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${contact.recipient.email}")
    private String recipientEmail;
    
    @Value("${spring.mail.username:}")
    private String mailUsername;

    public void sendContactEmail(String name, String email, String message) {
        // Check if email is configured
        if (mailSender == null || mailUsername == null || mailUsername.isEmpty()) {
            System.out.println("⚠️  Email not configured. Message logged to console only.");
            System.out.println("📧 Contact Form Message:");
            System.out.println("   Name: " + name);
            System.out.println("   Email: " + email);
            System.out.println("   Message: " + message);
            return;
        }
        
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("Portfolio Contact Form: Message from " + name);
            mailMessage.setText(
                "You received a new message from your portfolio contact form:\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message + "\n\n" +
                "---\n" +
                "Sent from Portfolio Contact Form"
            );
            mailMessage.setReplyTo(email);
            
            mailSender.send(mailMessage);
            System.out.println("✅ Email sent successfully to " + recipientEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            System.out.println("📧 Message logged to console:");
            System.out.println("   Name: " + name);
            System.out.println("   Email: " + email);
            System.out.println("   Message: " + message);
        }
    }
}
