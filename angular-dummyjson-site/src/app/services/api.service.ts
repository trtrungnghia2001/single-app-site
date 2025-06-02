import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ICartList, IProductList, IQuery } from '../modules';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = `https://dummyjson.com/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  query = signal<IQuery>({
    limit: 30,
    skip: 0,
    total: 0,
    q: '',
  });
  setQuery(value: Partial<IQuery>) {
    this.query.set({
      ...this.query(),
      ...value,
    });
  }
  getProductsSearch(): Observable<IProductList> {
    const params = this.query() as unknown as HttpParams;
    return this.http.get<IProductList>(this.baseUrl + `products/search`, {
      params: params,
    });
  }
  getCartByUser(): Observable<ICartList> {
    const id = this.authService.auth?.id;
    return this.http.get<ICartList>(this.baseUrl + `carts/user/${id}`);
  }
}
