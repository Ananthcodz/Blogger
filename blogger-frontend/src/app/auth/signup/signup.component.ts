import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const { email, password } = this.signupForm.value;
      
      this.authService.register(email, password).subscribe({
        next: (response) => {
          this.proceedWithLogin(email, password);
        },
        error: (error) => {
          console.error('Registration error:', error);
          
          if (error.status === 409 || error.error?.message?.includes('already exists')) {
            this.snackBar.open('Email already registered. Please log in.', 'Close', { duration: 5000 });
            this.router.navigate(['/auth/login']);
          } else {
            this.proceedWithLogin(email, password);
          }
        }
      });
    }
  }
  
  private proceedWithLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: () => {
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/blogs']);
      },
      error: (loginError) => {
        console.error('Login error after signup:', loginError);
        this.isLoading = false;
        this.snackBar.open(
          'Account created but login failed. Please try logging in manually.',
          'Close',
          { duration: 5000 }
        );
        this.router.navigate(['/auth/login']);
      }
    });
  }
}