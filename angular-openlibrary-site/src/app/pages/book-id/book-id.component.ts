import { Component, effect, inject } from '@angular/core';
import { IBookDetail } from '../../models';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { OpenlibraryService } from '../../services/openlibrary.service';

@Component({
  selector: 'app-book-id',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './book-id.component.html',
  styleUrl: './book-id.component.css',
})
export class BookIdComponent {
  book!: IBookDetail;
  isLoading: boolean = false;
  isBookmark: boolean = false;

  router = inject(ActivatedRoute);
  service = inject(OpenlibraryService);

  ngOnInit(): void {
    this.isLoading = true;
    this.router.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.isBookmark = this.service.checkBookmark(id);
        this.service.getBookId(id).subscribe((value) => {
          this.book = value;
          this.isLoading = false;
        });
      }
    });
  }

  getCover() {
    return this.service.getCover(this.book.covers?.[0], 'L');
  }

  toggleBookmark() {
    if (this.isBookmark) {
      this.isBookmark = false;
      this.service.removeBookmark(this.book.key);
    } else {
      this.isBookmark = true;
      this.service.addBookmark(this.book);
    }
  }
}
