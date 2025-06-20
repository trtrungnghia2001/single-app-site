import { Component, inject } from '@angular/core';
import { SearchContainerComponent } from '@/app/components/search-container/search-container.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { IMedia } from '@/app/models/media';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { IPeople } from '@/app/models/people';
import { finalize, forkJoin, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    SearchContainerComponent,
    MediaListComponent,
    PeopleListComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tmdbApi = inject(TmdbApiService);

  private destroy$ = new Subject<void>();
  isLoading: boolean = false;

  trending: IMedia[] = [];
  trendingPeople: IPeople[] = [];
  trendingTV: IMedia[] = [];
  trendingMovie: IMedia[] = [];

  ngOnInit(): void {
    forkJoin({
      trending: this.tmdbApi.getTrending(),
      trendingPeople: this.tmdbApi.getTrendingPeople(),
      trendingTV: this.tmdbApi.getTrendingTv(),
      trendingMovie: this.tmdbApi.getTrendingMovie(),
    })
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.trending = value.trending.results;
        this.trendingPeople = value.trendingPeople.results;
        this.trendingMovie = value.trendingMovie.results;
        this.trendingTV = value.trendingTV.results;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
