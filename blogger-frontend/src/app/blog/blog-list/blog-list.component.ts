import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService, Blog, PageResponse } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = true;
  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading = true;
    this.blogService.getBlogs(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<Blog>) => {
        this.blogs = response.content;
        this.totalItems = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blogs', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBlogs();
  }
}