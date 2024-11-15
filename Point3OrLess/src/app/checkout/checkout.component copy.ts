import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../service/cart.service';
import { UserInfoService } from '../service/user-info.service'; // Import the UserInfoService
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [NgIf, NgFor],
})
export class CheckoutComponent implements OnInit {
  public nonce: string | null = null;
  public errorMessage: string | null = null;
  public totalAmount: number = 0; // Track the total amount of the cart
  public userName: string = ''; // Track the user's name
  public userAddress: string = ''; // Track the user's address
  public cartItems: any[] = []; // Array to hold the cart items
  userData = { email: '' };
  userPhone = '';
  private card: any; // Track the card instance

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private userInfoService: UserInfoService, // Inject UserInfoService
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Dynamically load the Square.js script
    this.loadSquareScript();

    // Get user info
    this.loadUserInfo();

    // Get cart items and calculate the total price
    this.cartItems = this.cartService.getCartItems(); // Get cart items from CartService
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
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log('Total Amount:', this.totalAmount);
  }

  // Get user information from the UserInfoService
  loadUserInfo(): void {
    this.userData = this.userInfoService.getUserData();
    this.userName = this.userInfoService.getUserName(); // Get the user's full name
    const userAddress = this.userInfoService.getUserAddress();
    if (userAddress) {
      this.userAddress = `${userAddress.street}, ${userAddress.city}, ${userAddress.state}, ${userAddress.postalCode}`;
      this.userPhone = userAddress.phoneNumber;
    }
    console.log('User Info:', this.userData);
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
          this.nonce = 'cnon:card-nonce-ok';
          console.log('Nonce:', this.nonce);
          this.sendToCharge(this.nonce);
        } else {
          this.errorMessage = result.errors[0].message;
        }
      })
      .catch((error: any) => {
        this.errorMessage = `Error during payment tokenization: ${error}`;
      });
  }

  sendToCharge(cnonce: string | null) {
    let FullOrder = {
      jwtToken: this.userInfoService.getSessionToken(),
      user: {
        name: this.userName,
        email: this.userData.email,
        phone: this.userPhone,
        address: this.userAddress,
        Data: this.userData,
      },
      order: this.cartItems,
      cnonce: cnonce,
    };
    console.log(FullOrder);
    this.paymentService.processPayment(FullOrder).subscribe(
      (response) => {
        // Log the response to the console
        console.log('Payment response:', response.body);
        if (JSON.parse(response.body).status == 'Payment Successful') {
          alert('Credit Card Approved');
        } else {
          alert('Credit Card Error');
        }
      },
      (error) => {
        // Log any errors to the console
        console.error('Payment error:', error);
      }
    );
  }
}
