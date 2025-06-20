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
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
        .register(this.form.value.email, this.form.value.password)
        .subscribe(
          (value) => {
            this.router.navigate(['/login']);
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
