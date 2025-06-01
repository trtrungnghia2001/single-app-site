import { Component, effect, inject, Input } from '@angular/core';
import { IBook } from '../../models';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-item',
  imports: [RouterModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  service = inject(OpenlibraryService);
  @Input() book!: IBook;
  getCover() {
    return this.service.getCover(this.book.cover_i, 'S');
  }

  constructor() {}
}
