import { AuthService } from '@/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [
    {
      title: 'Movies', // Title for the main category
      list: [
        {
          title: 'Now Playing', // Sub-category title
          path: 'movie/now_playing', // TMDb API endpoint path
        },
        {
          title: 'Popular',
          path: 'movie/popular',
        },
        {
          title: 'Upcoming',
          path: 'movie/upcoming',
        },
        {
          title: 'Top Rated',
          path: 'movie/top_rated',
        },
      ],
    },
    {
      title: 'TV Shows',
      list: [
        {
          title: 'Airing Today',
          path: 'tv/airing_today',
        },
        {
          title: 'On The Air',
          path: 'tv/on_the_air',
        },
        {
          title: 'Popular',
          path: 'tv/popular',
        },
        {
          title: 'Top Rated',
          path: 'tv/top_rated',
        },
      ],
    },
    {
      title: 'People',
      list: [
        {
          title: 'Popular',
          path: 'person/popular',
        },
      ],
    },
  ];
  user: User | null = null;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((val) => {
      this.user = val;
    });
  }

  handleSignout() {
    this.auth.logout();
    this.auth.setUser(null);
  }
}
