package com.ananth.blogger.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;
    
    public String getJwtSecret() {
        return jwtSecret;
    }
    
    public long getJwtExpirationInMs() {
        return jwtExpirationInMs;
    }
}