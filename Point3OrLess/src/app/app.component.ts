import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInfoService } from './service/user-info.service';
import { CartService } from './service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Point3OrLess';
  cartItemCount: number = 0; // Store the cart item count
  private cartSubscription: Subscription | null = null; // Initialize with null

  constructor(
    private router: Router,
    private userInforService: UserInfoService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    // Subscribe to the cartItems$ observable to track changes in the cart
    this.cartSubscription = this.cartService.cartItems$.subscribe(
      (cartItems) => {
        this.cartItemCount = this.cartService.getCartItemCount(); // Update cart count
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the cartItems$ observable when the component is destroyed
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  navigateToProfile(path: string) {
    if (this.userInforService.getUserData() !== null) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Method to calculate the cart count
  updateCartCount(): void {
    this.cartItemCount = this.cartService
      .getCartItems()
      .reduce((total, item) => total + item.quantity, 0);
  }
}
