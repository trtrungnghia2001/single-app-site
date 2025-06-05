// src/app/auth/login/login.component.ts
import { AuthService } from '@/src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = null; // Xóa lỗi cũ
    this.authService.login(this.email, this.password).subscribe({
      next: (userCredential) => {
        console.log('User logged in successfully:', userCredential.user.email);
        this.router.navigate(['/dashboard']); // Chuyển hướng sau khi đăng nhập
      },
      error: (err) => {
        this.errorMessage =
          err.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
    });
  }
}
