import { Component, Input } from '@angular/core';
import { IBook } from '../../types';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-item',
  imports: [RouterModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  @Input() book!: IBook;

  constructor(private services: OpenlibraryService) {}

  getCover(): string {
    return this.services.getCover(this.book.cover_i);
  }
}
