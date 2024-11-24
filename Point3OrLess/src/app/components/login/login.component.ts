import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService, // Inject the user service
    private userInfoService: UserInfoService, // Inject the UserInformationService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.loginForm.value.userPassword = this.loginForm.value.password;
    delete this.loginForm.value.password;

    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.statusCode === 200) {
            // console.log('User logged in successfully', response);
            console.log(JSON.parse(response.body).token);

            let sessionToken = JSON.parse(response.body).token;
            this.userInfoService.setSessionToaken(sessionToken);
            // console.log(response.user);
            this.userInfoService.setUserData(response.user); // Set user information
            console.log(this.userInfoService.getUserData());
            console.log(response);
            // console.log(this.userInfoService.getSessionToken());
            // Check if the user is approved

            // if (
            //   response.user.isApproved === false &&
            //   response.user.isActive === false
            // ) {
            //   this.router.navigate(['business-profile']); // Navigate to the business profile
            // }
            // if (
            //   response.user.documentsSubmitted == false &&
            //   response.user.isActive === true
            // ) {
            //   this.router.navigate(['documents']); // Navigate to the business documents
            // }
            // if (response.user.isApproved === true) {
            //   this.router.navigate(['/products']); // Navigate to the business profile
            // }
            // else {
            //   this.router.navigate(['products']); // Navigate to the home route if approved
            // }

            if (
              response.user.isApproved === false &&
              response.user.isActive === false
            ) {
              this.router.navigate(['business-profile']); // Navigate to the business profile
            } else if (
              response.user.documentsSubmitted === false &&
              response.user.isActive === true
            ) {
              this.router.navigate(['documents']); // Navigate to the business documents
            } else if (response.user.isApproved === false) {
              this.router.navigate(['business-profile']); // Navigate to the products
            } else {
              this.router.navigate(['products']); // Navigate to the products by default
            }
          } else {
            alert('Bad Request');
          }
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    }
  }

  changePassword(): void {
    window.open('https://point3orless.com/reset/index.html', '_blank');
  }
  registerForP3OL() {
    this.router.navigate(['/register']);
  }
}
