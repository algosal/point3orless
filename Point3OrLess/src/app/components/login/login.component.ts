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
            console.log(
              'User logged in successfully',
              response,
              JSON.parse(response.body).data
            );
            this.userInfoService.setUserData(JSON.parse(response.body).data); // Set user information

            // Check if the user is approved
            if (JSON.parse(response.body).data.isApproved === 'No') {
              this.router.navigate(['/business-profile']); // Navigate to the business profile
            } else {
              this.router.navigate(['']); // Navigate to the home route if approved
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
}
