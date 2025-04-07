import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BlogService, Blog } from '../../core/services/blog.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  isLoading = true;
  isAuthor = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBlog(id);
  }

  loadBlog(id: number) {
    this.isLoading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        this.isAuthor = this.checkIfAuthor(blog);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blog', error);
        this.isLoading = false;
        this.snackBar.open('Blog not found', 'Close', { duration: 3000 });
        this.router.navigate(['/blogs']);
      }
    });
  }

  checkIfAuthor(blog: Blog): boolean {
    const userId = this.authService.getUserId();
    return userId !== null && blog.authorId === userId;
  }

  deleteBlog() {
    if (!this.blog) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Delete Blog', message: 'Are you sure you want to delete this blog post? This action cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.blog) {
        this.blogService.deleteBlog(this.blog.id).subscribe({
          next: () => {
            this.snackBar.open('Blog deleted successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/blogs']);
          },
          error: (error) => {
            console.error('Error deleting blog', error);
            this.snackBar.open('Error deleting blog', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}