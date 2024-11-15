import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  router = inject(Router);
  cartItems: { id: string; name: string; quantity: number; price: number }[] =
    [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      // Handle the checkout process (e.g., navigate to a payment page, call an API, etc.)
      console.log(
        'Proceeding to checkout with the following items:',
        this.cartItems
      );

      this.router.navigate(['/address']);

      // You might want to implement navigation to a checkout page
      // For example, if you are using Angular Router:
      // this.router.navigate(['/checkout']);
    } else {
      console.log('Cart is empty, cannot proceed to checkout.');
    }
  }
  keepShopping() {
    this.router.navigate(['/products']);
  }
}
