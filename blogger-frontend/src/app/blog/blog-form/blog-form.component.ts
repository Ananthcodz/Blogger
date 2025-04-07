import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { BlogService, BlogRequest } from '../../core/services/blog.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LoadingComponent
  ],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  blogId: number | null = null;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.blogId = parseInt(idParam, 10);
      this.isEditMode = true;
      this.loadBlogForEdit(this.blogId);
    }
  }

  loadBlogForEdit(id: number) {
    this.isLoading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorService.handleError(error, 'Failed to load blog for editing');
        this.router.navigate(['/blogs']);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.isSubmitting = true;
      const blogData: BlogRequest = this.blogForm.value;
      
      if (this.isEditMode && this.blogId) {
        this.blogService.updateBlog(this.blogId, blogData).subscribe({
          next: (blog) => {
            this.handleSuccessfulSubmission('Blog updated successfully', blog.id);
          },
          error: (error) => {
            this.handleSubmissionError(error, 'Failed to update blog');
          }
        });
      } else {
        this.blogService.createBlog(blogData).subscribe({
          next: (blog) => {
            this.handleSuccessfulSubmission('Blog created successfully', blog.id);
          },
          error: (error) => {
            this.handleSubmissionError(error, 'Failed to create blog');
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.blogForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private handleSuccessfulSubmission(message: string, blogId: number) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.isSubmitting = false;
    this.router.navigate(['/blogs', blogId]);
  }

  private handleSubmissionError(error: any, defaultMessage: string) {
    this.isSubmitting = false;
    this.errorService.handleError(error, defaultMessage);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.blogForm.get(controlName);
    return control ? control.hasError(errorName) && (control.touched || control.dirty) : false;
  }

  cancel() {
    if (this.isEditMode && this.blogId) {
      this.router.navigate(['/blogs', this.blogId]);
    } else {
      this.router.navigate(['/blogs']);
    }
  }
}