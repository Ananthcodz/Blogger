package com.ananth.blogger.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BlogRequest {
    @NotBlank
    @Size(min = 3, max = 255)
    private String title;

    @NotBlank
    private String content;
    
    // Explicit getters and setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
}