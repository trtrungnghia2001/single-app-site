// src/app/auth/register/register.component.ts
import { AuthService } from '@/src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.errorMessage = null;
    this.authService.register(this.email, this.password).subscribe({
      next: (userCredential) => {
        console.log('User registered successfully:', userCredential.user.email);
        this.router.navigate(['/dashboard']); // Chuyển hướng sau khi đăng ký thành công
      },
      error: (err) => {
        this.errorMessage = err.message || 'Registration failed.';
        console.error('Registration error:', err);
      },
    });
  }
}
