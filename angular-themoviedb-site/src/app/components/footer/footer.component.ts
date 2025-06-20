import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  links = [
    {
      title: 'The Basics',
      list: [
        {
          title: 'Giới thiệu về TMDB',
          path: '/about',
        },
        {
          title: 'Contact Us',
          path: '/talk',
        },
        {
          title: 'Support Forums',
          path: '/talk',
        },
        {
          title: 'API Documentation',
          path: '/documentation/api',
        },
        {
          title: 'System Status',
          path: '/status',
        },
      ],
    },
    {
      title: 'Get Involved',
      list: [
        {
          title: 'Contribution Bible',
          path: '/bible',
        },
        {
          title: 'Thêm phim mới',
          path: '/movie/new',
        },
        {
          title: 'Thêm chương trình TV mới',
          path: '/tv/new',
        },
      ],
    },
    {
      title: 'Community',
      list: [
        {
          title: 'Guidelines',
          path: '/guidelines',
        },
        {
          title: 'Discussions',
          path: '/talk',
        },
        {
          title: 'Leaderboard',
          path: '/leaderboard',
        },
      ],
    },
    {
      title: 'Legal',
      list: [
        {
          title: 'Terms of Use',
          path: '/terms-of-use',
        },
        {
          title: 'API Terms of Use',
          path: '/documentation/api/terms-of-use',
        },
        {
          title: 'Privacy Policy',
          path: '/privacy-policy',
        },
        {
          title: 'DMCA Policy',
          path: '/dmca-policy',
        },
      ],
    },
  ];
}
