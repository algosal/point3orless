import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../service/cart.service';
import { UserInfoService } from '../service/user-info.service';
import { PaymentService } from '../service/payment.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PriceService } from '../service/dynamic-price-restriction.service';

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
  public totalAmount: number = 0;
  public userName: string = '';
  public userAddress: string = '';
  public cartItems: any[] = [];
  public countdown: number = 30; // 10 seconds countdown for payment
  public isPaymentProcessing: boolean = false; // Flag to indicate if payment is processing
  public isPaymentSuccessful: boolean | null = null; // null, true, or false based on payment status
  public dynamicPriceRestriction: number = 0;
  userData = { email: '' };
  userPhone = '';
  private card: any;
  private timer: any = null;
  private totalAmountPriorToShipment: number = 0;

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private userInfoService: UserInfoService,
    private paymentService: PaymentService,
    private router: Router,
    private priceService: PriceService
  ) {}

  ngOnInit(): void {
    this.loadSquareScript();
    this.loadUserInfo();
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
    this.fetchLatestPrice();
  }
  fetchLatestPrice(): void {
    this.priceService.getLatestPrice().subscribe({
      next: (price_restriction) => {
        this.dynamicPriceRestriction = price_restriction;
        // console.log(
        //   'Fetched Dynamic Price Restriction: ',
        //   this.dynamicPriceRestriction
        // );
      },
      error: (error) => {
        this.errorMessage = error.message;
        // console.error('Error fetching dynamic price restriction:', error);
      },
    });
  }

  loadSquareScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // console.log('Square.js script loaded successfully.');
      this.initializePaymentForm();
    };
    script.onerror = (error: any) => {
      console.error('Error loading Square.js script', error);
      this.errorMessage = 'Error loading Square.js script.';
    };

    this.renderer.appendChild(document.body, script);
  }

  initializePaymentForm(): void {
    const applicationId = 'sandbox-sq0idb-91Z1QfCAP-MnIVnZ8TsdAw';
    const locationId = 'LZX4AARBRAE18';
    const payments = (window as any).Square.payments(applicationId, locationId);

    payments
      .card()
      .then((cardInstance: any) => {
        this.card = cardInstance;
        this.card.attach('#card-container');
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
    this.totalAmountPriorToShipment = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    this.totalAmount =
      this.totalAmountPriorToShipment + this.totalAmountPriorToShipment * 0.05;
    // console.log('Total Amount:', this.totalAmount);
  }

  loadUserInfo(): void {
    this.userData = this.userInfoService.getUserData();
    this.userName = this.userInfoService.getUserName();
    const userAddress = this.userInfoService.getUserAddress();
    if (userAddress) {
      this.userAddress = `${userAddress.street}, ${userAddress.city}, ${userAddress.state}, ${userAddress.postalCode}`;
      this.userPhone = userAddress.phoneNumber;
    }
    // console.log('User Info:', this.userData);
  }

  startCountdown(): void {
    this.isPaymentProcessing = true;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  tokenizeCard(): void {
    if (!this.card) {
      this.errorMessage = 'Card is not initialized.';
      return;
    }

    // Check if totalAmount is greater than or equal to 3000
    if (this.totalAmount < this.dynamicPriceRestriction) {
      this.errorMessage =
        'The total amount must be at least $3,000 to proceed.';
      return;
    }

    this.card
      .tokenize()
      .then((result: any) => {
        if (result.status === 'OK') {
          this.nonce = result.token;
          // console.log('Nonce:', this.nonce);
          this.sendToCharge(this.nonce);
          this.startCountdown();
        } else {
          this.errorMessage = result.errors[0].message;
        }
      })
      .catch((error: any) => {
        this.errorMessage = `Error during payment tokenization: ${error}`;
        this.isPaymentProcessing = false;
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
    // console.log(FullOrder);
    this.paymentService.processPayment(FullOrder).subscribe(
      (response) => {
        console.log('Payment response:', response.body);
        if (JSON.parse(response.body).status == 'Payment Successful') {
          this.isPaymentSuccessful = true;
          setTimeout(() => {
            this.cartService.clearCart(); // Clear cart after successful payment
            this.navigateToSuccessPage();
          }, 3000); // Navigate after short delay
        } else {
          this.isPaymentSuccessful = false;
        }
      },
      (error) => {
        console.error('Payment error:', error);
        this.isPaymentSuccessful = false;
      }
    );
  }

  navigateToSuccessPage() {
    // alert('We Will Navigate now');
    this.router.navigate(['/']);
  }

  tryAgain() {
    this.isPaymentProcessing = false;
    this.isPaymentSuccessful = null;
    this.countdown = 30;
    clearInterval(this.timer);
  }

  keepShopping(){
    this.router.navigate(['/products'])
  }
}
