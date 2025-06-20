import { IMedia } from '@/app/models/media';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-media-card',
  imports: [RouterModule],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.css',
})
export class MediaCardComponent {
  @Input() data!: IMedia;
  @Input() media_type?: string;
  tmdbApi = inject(TmdbApiService);

  ngOnInit(): void {
    this.data.vote_average = Math.ceil(this.data.vote_average * 10);
    this.data.poster_path = this.tmdbApi.getThumbnail(this.data.poster_path);
  }
}
