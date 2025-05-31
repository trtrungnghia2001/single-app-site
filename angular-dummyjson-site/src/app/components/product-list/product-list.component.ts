import { IProduct } from '@/app/modules';
import { ApiService } from '@/app/services/api.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: IProduct[] = [];
  service = inject(ApiService);
  skip = this.service.query().skip;
  limit = this.service.query().limit;
  total = this.service.query().total;
  isLoading: boolean = false;
  showBtn: boolean = true;

  constructor() {
    effect(() => {
      this.isLoading = true;
      this.service.getProducts().subscribe((value) => {
        this.products = [...this.products, ...value.products];
        this.skip = value.skip;
        this.total = value.total;
        this.isLoading = false;
        if (value.skip >= value.total) {
          this.showBtn = false;
        }
      });
    });
  }

  viewMore() {
    if (this.skip > this.total) {
      return;
    }
    this.service.query.set({
      ...this.service.query(),
      skip: this.skip + this.limit,
    });
  }
}
