import { AuthService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Bạn có thể bỏ qua file SCSS này nếu chỉ dùng Tailwind
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errMessage: string = '';
  sucMessage: string = '';
  router = inject(Router);

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Logic đăng nhập thực tế
      this.errMessage = '';
      this.sucMessage = '';
      this.authService.login(this.loginForm.value).subscribe(
        (resp) => {
          this.authService.setAuth(resp);
          this.sucMessage = `Login successful!`;
          this.router.navigate(['']);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errMessage = error.error.message;
        }
      );
    } else {
      console.log('Form is invalid. Please check your inputs.');
      this.loginForm.markAllAsTouched();
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
