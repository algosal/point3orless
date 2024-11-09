import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  standalone: true,
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  imports: [FormsModule],
})
export class AddressFormComponent {
  street = '';
  city = '';
  state = '';
  postalCode = '';
  phoneNumber = '';

  constructor(
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  isStateInvalid(): boolean {
    return this.state.length > 2 || !/^[A-Za-z]*$/.test(this.state);
  }

  isPhoneNumberInvalid(): boolean {
    return !/^[0-9]{10}$/.test(this.phoneNumber);
  }

  onSubmit() {
    if (
      this.street.trim() &&
      this.city.trim() &&
      !this.isStateInvalid() &&
      this.postalCode.trim() &&
      !this.isPhoneNumberInvalid()
    ) {
      // Handle valid form submission
      console.log('Form submitted:', {
        street: this.street,
        city: this.city,
        state: this.state,
        postalCode: this.postalCode,
        phoneNumber: this.phoneNumber,
      });

      this.userInfoService.setUserAddress({
        street: this.street,
        city: this.city,
        state: this.state,
        postalCode: this.postalCode,
        phoneNumber: this.phoneNumber,
      });

      this.router.navigate(['checkout']);
    }
  }
}
