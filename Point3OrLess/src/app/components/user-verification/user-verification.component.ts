import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { VerificationService } from '../../service/verification.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class UserVerificationComponent implements OnInit {
  user: any = null; // Holds the user object
  phoneCode: string = ''; // Holds the entered verification code
  isPhoneVerified: boolean = false;
  isEmailVerified: boolean = false;
  message: string = ''; // Displays messages for the user
  isEmailVerificationSent: boolean = false; // Track if email verification was sent

  constructor(
    private userInfoService: UserInfoService,
    private verificationService: VerificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch user data
    this.user = this.userInfoService.getUserData();
    // console.log(this.user);
    if (this.user) {
      this.isPhoneVerified = this.user.phoneVerified;
      this.isEmailVerified = this.user.emailVerified;
    }
  }

  // Trigger phone verification
  sendPhoneVerificationCode(): void {
    if (this.user && this.user.phoneNumber) {
      this.verificationService.sendPhoneCode(this.user.phoneNumber).subscribe({
        next: (res) => {
          // console.log(res);
          this.message = 'Verification code sent to your phone.';
        },
        error: () => {
          this.message = 'Failed to send verification code. Please try again.';
        },
      });
    }
  }

  // Validate the phone verification code
  validatePhoneCode(): void {
    if (this.phoneCode) {
      this.verificationService
        .validatePhoneCode(this.user.phoneNumber, this.phoneCode)
        .subscribe({
          next: () => {
            this.isPhoneVerified = true;
            this.user.phoneVerified = true; // Update locally
            this.message = 'Phone number successfully verified.';
            this.verificationService
              .sendPhoneVerificationWithJwtToDynamoDB(
                this.user.email,
                this.userInfoService.getSessionToken()
              )
              .subscribe(
                (response) => {
                  // console.log('Verification successful', response);
                },
                (error) => {
                  console.error('Verification failed', error);
                }
              );
          },
          error: () => {
            this.message = 'Invalid verification code. Please try again.';
          },
        });
    }
  }

  // Trigger email verification
  sendEmailVerification(): void {
    if (this.user && this.user.email) {
      this.verificationService
        .sendEmailVerification(
          this.user.email,
          this.userInfoService.getSessionToken()
        )
        .subscribe({
          next: (response) => {
            // console.log(response);
            this.isEmailVerificationSent = true; // Disable the button after one click
            this.message = 'Verification email sent. Please check your inbox.';
            alert('Check your inbox to activate your email');
            this.router.navigate(['login']);
          },
          error: () => {
            this.message =
              'Failed to send verification email. Please try again.';
            this.isEmailVerificationSent = true; // Disable the button after one click
          },
        });
    }
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }
}
