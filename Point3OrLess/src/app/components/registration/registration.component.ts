import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.http
        .post('https://your-api-url.com/register', this.registrationForm.value)
        .subscribe(
          (response) => {
            console.log('User registered successfully', response);
          },
          (error) => {
            console.error('Registration error', error);
          }
        );
    }
  }
}
