package com.mohit.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // The API serves public, read-only content plus a contact POST — there are
        // no cookies or auth to protect, so credentials stay OFF. Combined with a
        // wildcard *.vercel.app origin, allowCredentials(true) would trust any
        // attacker-deployed *.vercel.app site as a credentialed origin.
        config.setAllowCredentials(false);
        // Explicit origins only — never a wildcard subdomain that anyone can claim.
        config.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:*",
            "https://mohitkumar-mu.vercel.app"
        ));
        config.setAllowedHeaders(Arrays.asList("Content-Type"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
