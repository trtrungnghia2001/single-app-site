import { IPeople } from '@/app/models/people';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-people-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './people-card.component.html',
  styleUrl: './people-card.component.css',
})
export class PeopleCardComponent {
  @Input() data!: IPeople;
  tmdbApi = inject(TmdbApiService);

  ngOnInit(): void {
    this.data.profile_path = this.tmdbApi.getAvatar(this.data.profile_path);
  }
}
