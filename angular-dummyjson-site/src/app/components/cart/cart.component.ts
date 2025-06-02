import { ICartList } from '@/app/modules';
import { ApiService } from '@/app/services/api.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  service = inject(ApiService);
  isLoading: boolean = false;
  carts!: ICartList;
  errMessage: string = '';

  ngOnInit(): void {
    this.isLoading = true;
    this.errMessage = '';
    this.service.getCartByUser().subscribe(
      (resp) => {
        this.carts = resp;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errMessage = error.error.message;
        this.isLoading = false;
      }
    );
  }
}
