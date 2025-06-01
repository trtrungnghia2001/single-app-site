import { Component, effect, inject } from '@angular/core';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { IBook } from '../../models';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../../components/book-item/book-item.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, BookItemComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  service = inject(OpenlibraryService);
  books!: IBook[];
  isLoading: boolean = false;

  constructor(private router: ActivatedRoute) {
    effect(() => {
      this.isLoading = true;
      this.service.getBooks(this.service.searchTerm()).subscribe((value) => {
        this.books = value.docs;
        this.isLoading = false;
      });
    });
  }

  ngOnInit(): void {}
}
