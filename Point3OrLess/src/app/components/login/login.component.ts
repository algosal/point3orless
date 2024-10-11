import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

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
            console.log('User logged in successfully', response);
            this.router.navigate(['']); // Navigate to the home route after login
            // const jwtToken = this.userService.getJwtToken();
            // // console.log('JWT Token:', jwtToken);

            // if (jwtToken) {
            //   console.log('JWT Token:', jwtToken);
            // }
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
