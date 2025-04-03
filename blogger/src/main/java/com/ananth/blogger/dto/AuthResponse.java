package com.ananth.blogger.dto;

public class AuthResponse {
    private String token;
    private String email;
    private Long userId;
    
    // Constructor
    public AuthResponse(String token, String email, Long userId) {
        this.token = token;
        this.email = email;
        this.userId = userId;
    }
    
    // Empty constructor
    public AuthResponse() {
    }
    
    // Getters and setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}