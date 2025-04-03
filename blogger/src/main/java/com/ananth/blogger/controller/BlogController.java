package com.ananth.blogger.controller;

import com.ananth.blogger.dto.BlogRequest;
import com.ananth.blogger.dto.PageResponse;
import com.ananth.blogger.model.Blog;
import com.ananth.blogger.model.User;
import com.ananth.blogger.service.AuthService;
import com.ananth.blogger.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    private final BlogService blogService;
    private final AuthService authService;

    public BlogController(BlogService blogService, AuthService authService) {
        this.blogService = blogService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<Map<String, Object>>> getAllBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Page<Blog> blogPage = blogService.getAllBlogs(PageRequest.of(page, size));
        
        PageResponse<Map<String, Object>> response = new PageResponse<>();
        response.setContent(blogPage.getContent().stream().map(this::convertToDto).collect(Collectors.toList()));
        response.setTotalPages(blogPage.getTotalPages());
        response.setTotalElements(blogPage.getTotalElements());
        response.setSize(blogPage.getSize());
        response.setNumber(blogPage.getNumber());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-blogs")
    public ResponseEntity<PageResponse<Map<String, Object>>> getMyBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Page<Blog> blogPage = blogService.getMyBlogs(PageRequest.of(page, size));
        
        PageResponse<Map<String, Object>> response = new PageResponse<>();
        response.setContent(blogPage.getContent().stream().map(this::convertToDto).collect(Collectors.toList()));
        response.setTotalPages(blogPage.getTotalPages());
        response.setTotalElements(blogPage.getTotalElements());
        response.setSize(blogPage.getSize());
        response.setNumber(blogPage.getNumber());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBlogById(@PathVariable Long id) {
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(convertToDto(blog));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBlog(@Valid @RequestBody BlogRequest blogRequest) {
        Blog blog = blogService.createBlog(blogRequest);
        return new ResponseEntity<>(convertToDto(blog), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogRequest blogRequest) {
        
        Blog blog = blogService.updateBlog(id, blogRequest);
        return ResponseEntity.ok(convertToDto(blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    private Map<String, Object> convertToDto(Blog blog) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", blog.getId());
        dto.put("title", blog.getTitle());
        dto.put("content", blog.getContent());
        dto.put("authorId", blog.getAuthor().getId());
        dto.put("authorEmail", blog.getAuthor().getEmail());
        dto.put("createdAt", blog.getCreatedAt().toString());
        if (blog.getUpdatedAt() != null) {
            dto.put("updatedAt", blog.getUpdatedAt().toString());
        }
        return dto;
    }
}