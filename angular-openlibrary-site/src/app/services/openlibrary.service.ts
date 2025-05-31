import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  pipe,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  // global state
  private _searchTerm = new BehaviorSubject<string>('dracula');
  readonly searchTerm$: Observable<string> = this._searchTerm
    .asObservable()
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((res) => {
      this.router.navigate(['/home']);
    });

  setSearchTerm(term: string): void {
    this._searchTerm.next(term);
  }
  getSearchTerm() {
    return this._searchTerm.getValue();
  }

  getCover(key: number): string {
    if (!key) return `/assets/book_cover_found.png`;

    return `https://covers.openlibrary.org/b/id/${key}-M.jpg?default=false`;
  }

  constructor(private router: Router) {}
}
