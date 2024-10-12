import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isModalOpen: boolean = false;
  isLoggedIn: boolean = false; // Initialize a variable to check login status

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    // Check if the user is logged in
    console.log('Navi');
    this.isLoggedIn = this.userInfoService.getUserData() !== null;
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
    this.closeModal(); // Close the modal after navigation
  }

  logOff() {
    // Logic for logging off the user
    this.userInfoService.setUserData(null); // Clear user data
    this.isLoggedIn = false; // Update the login status
    this.router.navigate(['/login']); // Redirect to login
  }
}
