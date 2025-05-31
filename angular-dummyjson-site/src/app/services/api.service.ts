import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProductList, IQuery } from '../modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = `https://dummyjson.com/`;
  query = signal<IQuery>({
    limit: 100,
    skip: 0,
    total: 0,
  });
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductList> {
    return this.http.get<IProductList>(
      this.baseUrl +
        `products?limit=${this.query().limit}&skip=${this.query().skip}`
    );
  }
}
