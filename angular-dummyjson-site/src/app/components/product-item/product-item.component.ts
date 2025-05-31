import { IProduct } from '@/app/modules';
import { Component, Input } from '@angular/core';
import {} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [MatIconModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() data!: IProduct;
}
