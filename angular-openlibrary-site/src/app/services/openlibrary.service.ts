import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { CoverSize, IBook, IBookDetail, ISearchBook } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  baseUrl: string = `https://openlibrary.org`;
  searchTerm = signal<string>('');

  constructor(private http: HttpClient) {
    this.getBookmark();
  }

  getBooks(search: string) {
    const url = this.baseUrl + `/search.json?q=` + search;
    return this.http.get<ISearchBook>(url);
  }
  getBookId(id: string) {
    const url = this.baseUrl + id + `.json`;
    return this.http.get<IBookDetail>(url);
  }
  getCover(cover: number, size: CoverSize): string {
    if (!cover) return 'assets/book_cover_found.png';
    return `https://covers.openlibrary.org/b/id/${cover}-${size}.jpg`;
  }

  //
  bookmark: IBook[] = [];
  getBookmark() {
    const getLocal = localStorage.getItem('bookmark');
    if (getLocal) {
      const value = JSON.parse(getLocal) as IBook[];
      this.bookmark = value;
    }
  }
  addBookmark(book: IBookDetail) {
    const customBook: Partial<IBook> = {
      key: book.key,
      title: book.title,
      cover_i: book.covers?.[0],
    };
    this.bookmark.push(customBook as IBook);

    localStorage.setItem('bookmark', JSON.stringify(this.bookmark));
  }
  removeBookmark(key: string) {
    this.bookmark = this.bookmark.filter((item) => item.key !== key);
    localStorage.setItem('bookmark', JSON.stringify(this.bookmark));
  }
  checkBookmark(key: string): boolean {
    if (this.bookmark.find((item) => item.key === key)) return true;
    return false;
  }
}
