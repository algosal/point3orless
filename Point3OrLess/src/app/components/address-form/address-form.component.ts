import { Component } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  standalone: true, // Marking the component as standalone
  imports: [FormsModule],
})
export class AddressFormComponent {
  street: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';
  country: string = '';

  constructor(private userInfoService: UserInfoService) {}

  onSubmit(): void {
    const addressData = {
      street: this.street,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      country: this.country,
    };
    this.userInfoService.setUserData({
      ...this.userInfoService.getUserData(),
      address: addressData,
    });
    console.log('Address submitted:', addressData);
  }
}
