import { Component, effect, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { IBookDetail } from '../../types';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-id',
  imports: [LoadingComponent, CommonModule],
  templateUrl: './book-id.component.html',
  styleUrl: './book-id.component.css',
})
export class BookIdComponent {
  idParam!: string;
  book!: Partial<IBookDetail>;
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private services: OpenlibraryService
  ) {
    effect(() => {
      if (this.query.isSuccess() && this.query.data()) {
        this.book = this.query.data();
      }
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((parmas) => {
      const getId = parmas.get('id');
      if (getId) {
        this.idParam = getId;
      }
    });
  }

  getCover(): string {
    return this.services.getCover(this.book?.covers?.[0] as number);
  }

  query = injectQuery(() => ({
    queryKey: ['books', this.idParam],
    queryFn: () =>
      lastValueFrom(
        this.http.get<IBookDetail>(
          `https://openlibrary.org` + this.idParam + `.json`
        )
      ),

    enabled: !!this.idParam,
  }));
}
