package com.ananth.blogger.repository;

import com.ananth.blogger.model.Blog;
import com.ananth.blogger.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Blog> findByAuthorOrderByCreatedAtDesc(User author, Pageable pageable);
}