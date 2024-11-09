import { NgIf } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class CheckoutComponent implements OnInit {
  public nonce: string | null = null;
  public errorMessage: string | null = null;
  public totalAmount: number = 0; // Track the total amount of the cart

  private card: any; // Track the card instance

  constructor(private renderer: Renderer2, private cartService: CartService) {}

  ngOnInit(): void {
    // Dynamically load the Square.js script
    this.loadSquareScript();

    // Calculate the total price based on the cart
    this.calculateTotalAmount();
  }

  loadSquareScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      console.log('Square.js script loaded successfully.');
      this.initializePaymentForm();
    };
    script.onerror = (error: any) => {
      console.error('Error loading Square.js script', error);
      this.errorMessage = 'Error loading Square.js script.';
    };

    this.renderer.appendChild(document.body, script);
  }

  initializePaymentForm(): void {
    const applicationId = 'sandbox-sq0idb-91Z1QfCAP-MnIVnZ8TsdAw'; // Your Square Application ID
    const locationId = 'LZX4AARBRAE18'; // Your Square Location ID
    const payments = (window as any).Square.payments(applicationId, locationId);

    payments
      .card()
      .then((cardInstance: any) => {
        this.card = cardInstance; // Store the card instance
        this.card.attach('#card-container');

        // Add event listener for when the card is successfully attached
        this.card.addEventListener('card:ready', () => {
          console.log('Card form attached successfully.');
        });
      })
      .catch((error: any) => {
        console.error('Error loading Square Payment Form:', error);
        this.errorMessage = 'Error loading Square Payment Form.';
      });
  }

  calculateTotalAmount(): void {
    const cartItems = this.cartService.getCartItems(); // Get the cart items from CartService
    this.totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log('Total Amount:', this.totalAmount);
  }

  tokenizeCard(): void {
    if (!this.card) {
      this.errorMessage = 'Card is not initialized.';
      return;
    }

    // Tokenize only when the card is attached
    this.card
      .tokenize()
      .then((result: any) => {
        if (result.status === 'OK') {
          this.nonce = result.token; // Successfully got nonce
          console.log('Nonce:', this.nonce);
        } else {
          this.errorMessage = result.errors[0].message;
        }
      })
      .catch((error: any) => {
        this.errorMessage = `Error during payment tokenization: ${error}`;
      });
  }
}
