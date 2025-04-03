package com.ananth.blogger.service;

import com.ananth.blogger.dto.BlogRequest;
import com.ananth.blogger.exception.ResourceNotFoundException;
import com.ananth.blogger.model.Blog;
import com.ananth.blogger.model.User;
import com.ananth.blogger.repository.BlogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final AuthService authService;

    public BlogServiceImpl(BlogRepository blogRepository, AuthService authService) {
        this.blogRepository = blogRepository;
        this.authService = authService;
    }

    @Override
    public Page<Blog> getAllBlogs(Pageable pageable) {
        return blogRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Override
    public Page<Blog> getMyBlogs(Pageable pageable) {
        User currentUser = authService.getCurrentUser();
        return blogRepository.findByAuthorOrderByCreatedAtDesc(currentUser, pageable);
    }

    @Override
    public Blog getBlogById(Long id) {
        Optional<Blog> blogOptional = blogRepository.findById(id);
        if (!blogOptional.isPresent()) {
            throw new ResourceNotFoundException("Blog not found with id: " + id);
        }
        return blogOptional.get();
    }

    @Override
    public Blog createBlog(BlogRequest blogRequest) {
        User currentUser = authService.getCurrentUser();
        
        Blog blog = new Blog();
        blog.setTitle(blogRequest.getTitle());
        blog.setContent(blogRequest.getContent());
        blog.setAuthor(currentUser);
        
        return blogRepository.save(blog);
    }

    @Override
    public Blog updateBlog(Long id, BlogRequest blogRequest) {
        Blog blog = getBlogById(id);
        
        if (!isBlogAuthor(id)) {
            throw new AccessDeniedException("You are not authorized to update this blog");
        }
        
        blog.setTitle(blogRequest.getTitle());
        blog.setContent(blogRequest.getContent());
        
        return blogRepository.save(blog);
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);
        
        if (!isBlogAuthor(id)) {
            throw new AccessDeniedException("You are not authorized to delete this blog");
        }
        
        blogRepository.delete(blog);
    }

    @Override
    public boolean isBlogAuthor(Long blogId) {
        User currentUser = authService.getCurrentUser();
        Blog blog = getBlogById(blogId);
        return blog.getAuthor().getId().equals(currentUser.getId());
    }
}