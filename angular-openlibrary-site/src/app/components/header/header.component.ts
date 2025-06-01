import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Bookmark',
      path: '/bookmark',
    },
  ];
}
