package com.ananth.blogger.service;

import com.ananth.blogger.dto.BlogRequest;
import com.ananth.blogger.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BlogService {
    Page<Blog> getAllBlogs(Pageable pageable);
    Page<Blog> getMyBlogs(Pageable pageable);
    Blog getBlogById(Long id);
    Blog createBlog(BlogRequest blogRequest);
    Blog updateBlog(Long id, BlogRequest blogRequest);
    void deleteBlog(Long id);
    boolean isBlogAuthor(Long blogId);
}