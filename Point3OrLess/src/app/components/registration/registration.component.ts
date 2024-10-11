import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordStrengthValidator, // Password strength validator
          ],
        ],
        confirmPassword: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, this.ageValidator]], // Age restriction validator
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator } // Custom validator for matching passwords
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Password strength validator
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if (!value.match(/[A-Z]/)) {
      return {
        passwordStrength:
          'Password must contain at least one uppercase letter.',
      };
    }
    if (!value.match(/[a-z]/)) {
      return {
        passwordStrength:
          'Password must contain at least one lowercase letter.',
      };
    }
    if (!value.match(/[0-9]/)) {
      return { passwordStrength: 'Password must contain at least one number.' };
    }
    if (!value.match(/[\W_]/)) {
      return {
        passwordStrength:
          'Password must contain at least one special character.',
      };
    }
    return null;
  }

  // Validator to ensure users are at least 21 years old
  // Validator to ensure users are at least 21 years old
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // If the birth month is after the current month, or it's the same month and birth date is in the future, subtract 1 from age.
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference <= 0)) {
      age--;
    }

    // Return error if user is younger than 21
    return age >= 21
      ? null
      : { ageInvalid: 'You must be 21 years or older to register.' };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.http
        .post(
          'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/Users',
          this.registrationForm.value
        )
        .subscribe(
          (response: any) => {
            if (response.statusCode == 200) {
              alert('Successfully Registered');
              this.router.navigate(['/login']); // Navigate to the login component
              // console.log('User registered successfully', response);
            } else {
              alert('Sorry Something went wrong');
              this.router.navigate(['']); // Navigate to the login component
            }
          },
          (error) => {
            console.error('Registration error', error);
          }
        );
    } else if (this.registrationForm.errors?.['passwordMismatch']) {
      console.error('Passwords do not match.');
    }
  }
}
