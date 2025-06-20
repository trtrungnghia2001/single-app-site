import { IKeyword, IMedia, IMediaDetail } from '@/app/models/media';
import { ICredits } from '@/app/models/people';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { MediaPlayComponent } from '../../components/media-play/media-play.component';
import { FirestoreService } from '@/app/services/store/firestore.service';
import { AuthService } from '@/app/services/auth/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-media-id',
  imports: [
    CommonModule,
    PeopleListComponent,
    RouterModule,
    MediaListComponent,
    MediaPlayComponent,
  ],
  templateUrl: './media-id.component.html',
  styleUrl: './media-id.component.css',
})
export class MediaIdComponent {
  tmdbApi = inject(TmdbApiService);
  route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;

  // play
  isPlayMedia: boolean = false;
  setIsPlayMedia(isPlayMedia: boolean) {
    this.isPlayMedia = isPlayMedia;
  }

  // data
  data?: IMediaDetail;
  credits?: ICredits;
  keywords?: IKeyword[];
  recommendations?: IMedia[];

  // param
  id: string = '';
  media_type: string = '';

  user?: User;
  // action
  isFavorite = false;
  isBookmark = false;
  handleFavorite() {
    if (!this.data || !this.user) return;

    if (!this.isFavorite) {
      this.fireStore.addMedia('favorite', {
        media: {
          ...this.data,
          vote_average: this.data.vote_average / 10,
        } as unknown as IMedia,
        media_type: this.media_type,
      });
      this.isFavorite = true;
    } else {
      this.fireStore.removeMedia('favorite', this.id, this.media_type);
      this.isFavorite = false;
    }
  }

  handleBookmark() {
    if (!this.data || !this.user) return;

    if (!this.isBookmark) {
      this.fireStore.addMedia('bookmark', {
        media: {
          ...this.data,
          vote_average: this.data.vote_average / 10,
        } as unknown as IMedia,
        media_type: this.media_type,
      });
      this.isBookmark = true;
    } else {
      this.fireStore.removeMedia('bookmark', this.id, this.media_type);
      this.isBookmark = false;
    }
  }

  constructor(private fireStore: FirestoreService, private auth: AuthService) {
    this.auth.user$.subscribe((value) => {
      if (value) {
        this.user = value;
      } else {
        this.isBookmark = false;
        this.isFavorite = false;
        this.user = undefined;
      }
    });
  }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(([paramMap, queryParamMap]) => {
          const id = paramMap.get('id');
          const media_type = queryParamMap.get('media_type');

          if (id && media_type) {
            this.id = id;
            this.media_type = media_type;
            // Sử dụng forkJoin để gọi tất cả API song song
            return forkJoin({
              mediaDetail: this.tmdbApi.getDetailMedia(media_type, id),
              credits: this.tmdbApi.getMediaCredit(media_type, id),
              keywords: this.tmdbApi.getMediaKeyword(media_type, id),
              recommendations: this.tmdbApi.getMediaRecommendations(
                media_type,
                id
              ),

              isFavorited: this.fireStore.checkMedia(
                'favorite',
                id,
                media_type
              ),
              isBookmarked: this.fireStore.checkMedia(
                'bookmark',
                id,
                media_type
              ),
            }).pipe(
              // Sau khi tất cả các API calls hoàn thành, xử lý dữ liệu
              map((value) => {
                //
                const processedMediaDetail = { ...value.mediaDetail };
                processedMediaDetail.poster_path = this.tmdbApi.getThumbnail(
                  processedMediaDetail.poster_path
                );
                processedMediaDetail.backdrop_path = `linear-gradient(to right, rgba(221, 221, 221, 1), rgba(221, 221, 221, 0.84) 50%, rgba(221, 221, 221, 0.84) 100%) ,
    url('${this.tmdbApi.getThumbnail(
      processedMediaDetail.backdrop_path || processedMediaDetail.poster_path
    )}')`;
                processedMediaDetail.vote_average = Math.ceil(
                  processedMediaDetail.vote_average * 10
                );

                return { ...value, mediaDetail: processedMediaDetail };
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
          this.data = value?.mediaDetail;
          this.credits = value?.credits;
          this.keywords = value?.keywords.keywords;
          this.recommendations = value?.recommendations.results;

          console.log(value?.isFavorited);

          this.isFavorite =
            value?.isFavorited && value?.isFavorited?.length > 0 ? true : false;

          this.isBookmark =
            value?.isBookmarked && value?.isBookmarked?.length > 0
              ? true
              : false;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Main subscription completed');
        },
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
  }
}
