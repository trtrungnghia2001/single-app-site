import { Component, effect, inject, OnInit } from '@angular/core';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { BookItemComponent } from '../../components/book-item/book-item.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchResult } from '../../types';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BookItemComponent,
    LoadingComponent,
    NgxPaginationModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly service = inject(OpenlibraryService);
  readonly searchTerm = toSignal(this.service.searchTerm$);

  constructor(private http: HttpClient) {}

  query = injectQuery(() => ({
    queryKey: ['books', this.searchTerm()],
    queryFn: () =>
      lastValueFrom(
        this.http.get<ISearchResult>(
          `https://openlibrary.org/search.json?q=` + this.searchTerm()
        )
      ),
    enabled: !!this.searchTerm(),
  }));

  ngOnInit(): void {}
}
