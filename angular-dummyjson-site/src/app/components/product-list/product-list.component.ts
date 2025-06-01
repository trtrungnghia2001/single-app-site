import { IProduct } from '@/app/modules';
import { ApiService } from '@/app/services/api.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: IProduct[] = [];
  searchTerm: string = '';
  service = inject(ApiService);
  isLoading: boolean = false;
  showBtn: boolean = true;

  constructor() {
    effect(() => {
      this.isLoading = true;
      this.service.getProductsSearch().subscribe((value) => {
        this.products = value.products;
        if (value.limit >= value.total) {
          this.showBtn = false;
        }
        this.isLoading = false;
      });
    });
  }

  viewMore() {
    const { limit } = this.service.query();
    this.service.setQuery({ limit: limit + 30 });
  }
  setSearchTerm() {
    this.service.setQuery({ q: this.searchTerm, limit: 30 });
  }
  trackByProductId(index: number, item: IProduct): number {
    return item.id;
  }
}
