import { IBook } from '@/app/models';
import { OpenlibraryService } from '@/app/services/openlibrary.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookItemComponent } from '../../components/book-item/book-item.component';

@Component({
  selector: 'app-book-mark',
  imports: [CommonModule, BookItemComponent],
  templateUrl: './book-mark.component.html',
  styleUrl: './book-mark.component.css',
})
export class BookMarkComponent {
  bookmark: IBook[] = [];
  service = inject(OpenlibraryService);

  ngOnInit(): void {
    this.bookmark = this.service.bookmark;
    console.log(this.bookmark);
  }
}
