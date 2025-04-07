import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse, fallbackMessage: string = 'An error occurred'): void {
    let errorMessage = fallbackMessage;
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      errorMessage = 'You are not authorized to perform this action';
    } else if (error.status === 403) {
      errorMessage = 'Access forbidden';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found';
    } else if (error.status === 0) {
      errorMessage = 'Server is unreachable. Please check your connection';
    }
    
    this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
  }
}