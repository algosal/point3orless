// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean = false; // To control modal visibility

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check localStorage for consent
    const consent = localStorage.getItem('ageConsent');
    if (!consent) {
      this.isModalOpen = true; // Open modal if consent is not present
    }
  }

  verifyAge(isOver21: boolean): void {
    if (isOver21) {
      this.askUserType(); // Ask for user type if over 21
    } else {
      alert('You must be 21 or older to access this site.');
      this.closeModal(); // Close modal on rejection
    }
  }

  askUserType(): void {
    const userType = confirm(
      'Are you a Business or an Individual? (Click OK for Business, Cancel for Individual)'
    );
    if (userType) {
      // Business user
      this.router.navigate(['/products']);
    } else {
      // Individual user
      window.location.href = 'https://point3orbelow.com';
    }
    // Store consent in localStorage
    localStorage.setItem('ageConsent', 'true');
    this.closeModal(); // Close modal after user type is selected
  }

  closeModal(): void {
    this.isModalOpen = false; // Close modal
  }
}
