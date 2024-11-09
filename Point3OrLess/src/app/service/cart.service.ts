import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = []; // Initialize the cart as an empty array
  private cartSubject = new BehaviorSubject<any[]>(this.cart); // Subject to notify changes
  cartItems$ = this.cartSubject.asObservable(); // Observable for other components to subscribe

  constructor() {}

  // Method to add a product to the cart
  addToCart(product: any): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If product exists, increase quantity
      existingProduct.quantity += product.quantity;
    } else {
      // Add new product to cart with initial quantity
      this.cart.push({ ...product, quantity: product.quantity });
    }

    this.cartSubject.next(this.cart); // Emit updated cart
  }

  // Method to get the cart items
  getCartItems(): any[] {
    return this.cart;
  }

  // Method to remove a product from the cart
  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.cartSubject.next(this.cart); // Emit updated cart
  }

  // Optional: Method to clear the cart
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart); // Emit updated cart
  }

  // Optional: Method to decrease quantity
  decreaseQuantity(productId: string): void {
    const existingProduct = this.cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity--;
      if (existingProduct.quantity <= 0) {
        this.removeFromCart(productId); // Remove the product if quantity is 0 or less
      }
    }
  }

  // Get the total quantity of items in the cart
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
