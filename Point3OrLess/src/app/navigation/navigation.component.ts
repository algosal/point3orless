import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { UserInfoService } from '../service/user-info.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [NgIf],
})
export class NavigationComponent implements OnInit {
  isModalOpen: boolean = false;
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.userInfoService.getUserData() !== null;

    // // Subscribe to cart changes to get the latest cart item count
    // this.cartService.cartItems$.subscribe((cartItems) => {
    //   this.cartItemCount = this.cartService.getCartItemCount();
    //   console.log('Cart count updated:', this.cartItemCount); // Debugging line

    //   // Manually trigger change detection to update the UI
    //   this.cdr.detectChanges();
    // });
  }

  openModal() {
    this.isLoggedIn = this.userInfoService.getUserData() !== null;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeModal();
  }

  logOff() {
    this.userInfoService.setUserData(null);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
