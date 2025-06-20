import { IPeopleDetail } from '@/app/models/people';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  combineLatest,
  forkJoin,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IMedia } from '@/app/models/media';
import { MediaCardComponent } from '../../components/media-card/media-card.component';

@Component({
  selector: 'app-people-id',
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './people-id.component.html',
  styleUrl: './people-id.component.css',
})
export class PeopleIdComponent {
  isLoading: boolean = false;
  destroy$ = new Subject<void>();
  tmdbApi = inject(TmdbApiService);

  data?: IPeopleDetail;
  movies?: IMedia[] = [];
  tv?: IMedia[] = [];
  backgroundImage?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(([paramMap]) => {
          const id = paramMap.get('id');

          if (id) {
            // Sử dụng forkJoin để gọi tất cả API song song
            return forkJoin({
              peopleDetail: this.tmdbApi.getDetailPeople(id),
              movies: this.tmdbApi.getMovieCreditsPeople(id),
              tv: this.tmdbApi.getTVCreditsPeople(id),
            }).pipe(
              // Sau khi tất cả các API calls hoàn thành, xử lý dữ liệu
              map((value) => {
                const processedPeopleDetail = { ...value.peopleDetail };

                processedPeopleDetail.profile_path = this.tmdbApi.getAvatar(
                  processedPeopleDetail.profile_path
                );
                this.backgroundImage = `linear-gradient(to right, rgba(221, 221, 221, 1), rgba(221, 221, 221, 0.84) 50%, rgba(221, 221, 221, 0.84) 100%) ,
    url('${this.tmdbApi.getThumbnail(
      processedPeopleDetail.profile_path || processedPeopleDetail.profile_path
    )}')`;

                return { ...value, peopleDetail: processedPeopleDetail };
              }),
              catchError((err) => {
                console.error(err);
                this.isLoading = false;
                return of(null);
              })
            );
          } else {
            console.warn(
              'SwitchMap: ID or media_type missing. Returning null.'
            );

            this.isLoading = false;
            return of(null);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.isLoading = false;
          this.data = value?.peopleDetail;
          this.movies = value?.movies.cast;
          this.tv = value?.tv.cast;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Main subscription completed');
        },
      });
  }

  // ngOnInit(): void {
  //   this.route.paramMap
  //     .pipe(
  //       tap(() => {
  //         this.isLoading = true;
  //       }),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe((paramMap) => {
  //       const id = paramMap.get('id');
  //       if (id) {
  //         this.tmdbApi.getDetailPeople(id).subscribe((value) => {
  //           this.isLoading = false;
  //           this.data = value;
  //           this.data.profile_path = this.tmdbApi.getAvatar(value.profile_path);
  //         });
  //       }
  //     });
  // }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
