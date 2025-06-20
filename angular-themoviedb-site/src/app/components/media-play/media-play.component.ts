import { IVideo } from '@/app/models/media';
import { TmdbApiService } from '@/app/services/tmdb-api.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-media-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-play.component.html',
  styleUrl: './media-play.component.css',
})
export class MediaPlayComponent {
  @Input() id!: string;
  @Input() media_type!: string;
  @Output() onClose = new EventEmitter<boolean>();

  tmdbApi = inject(TmdbApiService);
  data?: IVideo[] = [];
  youtubeEmbedUrl: unknown;
  destroy$ = new Subject<void>();
  isLoading = false;

  handleClose() {
    this.onClose.emit(false);
  }

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.tmdbApi
      .getVideo(this.media_type, this.id)
      .pipe(
        tap(() => (this.isLoading = true)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (value) => {
          this.data = value.results;
          if (value.results.length > 0) {
            this.youtubeEmbedUrl =
              this.domSanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube.com/embed/${value.results[0].key}`
              );
          }
        },
        (err) => {
          console.error(err);
        },
        () => {
          this.isLoading = false;
        }
      );

    window.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
    window.document.body.style.overflow = 'auto';
  }
}
