import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = []; // Initialize the cart as an empty array
  private userData: any = null;

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

    console.log('Cart updated:', this.cart);
  }

  // Method to get the cart items
  getCartItems(): any[] {
    return this.cart;
  }

  // Method to remove a product from the cart
  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  // Optional: Method to clear the cart
  clearCart(): void {
    this.cart = [];
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

  // Set only the address section of userData
  setUserAddress(address: any): void {
    if (!this.userData) this.userData = {};
    this.userData = { ...this.userData, address }; // Set the address in userData
    console.log('User address updated:', address);
  }
  // Get just the user’s address
  getUserAddress(): any {
    return this.userData?.address;
  }
}
