import { ItemSave } from '@/app/models/media';
import { FirestoreService } from '@/app/services/store/firestore.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MediaCardComponent } from '../../components/media-card/media-card.component';

@Component({
  selector: 'app-bookmark',
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent {
  destroy$ = new Subject<void>();
  isLoading = false;
  data: ItemSave[] = [];

  constructor(private fireStore: FirestoreService) {}

  ngOnInit(): void {
    const mediaObservable: Observable<any[] | null> | undefined =
      this.fireStore.getMedia('bookmark');

    if (mediaObservable) {
      mediaObservable
        .pipe(
          tap(() => {
            this.isLoading = true;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (val) => {
            if (val) {
              this.data = (val as { data: ItemSave }[]).map((item) => ({
                ...item.data,
                media: item.data.media,
              }));
            }
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            this.isLoading = false;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
