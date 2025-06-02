import { AuthService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [`home`, `product`, `cart`, `recipes`, `post`, `comment`, `todo`];
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getAuth();
  }
}
