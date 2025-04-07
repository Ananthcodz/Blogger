import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService, Blog, PageResponse } from '../../core/services/blog.service';
import { ErrorService } from '../../core/services/error.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LoadingComponent
  ],
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = true;
  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private blogService: BlogService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadMyBlogs();
  }

  loadMyBlogs() {
    this.isLoading = true;
    this.blogService.getMyBlogs(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<Blog>) => {
        this.blogs = response.content;
        this.totalItems = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorService.handleError(error, 'Error loading your blogs');
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMyBlogs();
  }
}