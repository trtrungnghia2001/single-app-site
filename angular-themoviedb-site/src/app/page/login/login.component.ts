import { AuthService } from '@/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
    });
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  // Phương thức được gọi khi form được submit
  onSubmit(): void {
    if (this.form.valid) {
      this.auth
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (value) => {
            this.auth.setUser(value.user);
            this.router.navigate(['/']);
          },
          (err) => {
            console.error(err);
            alert(err);
          }
        );
    } else {
    }
  }
}
