import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BusinessService } from '../../service/business.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class BusinessProfileComponent implements OnInit {
  userData: any;
  // businessForm: FormGroup;

  businessForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {
    this.businessForm = this.fb.group({
      business_name: ['', Validators.required],
      business_type: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9\-]+$/)],
      ],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      website_url: ['', Validators.required],
      owner_name: ['', Validators.required],
      established_date: ['', Validators.required],
      ein_or_tax_id: ['', Validators.required],
      resellers_certificate: ['', Validators.required],
      number_of_employees: [0, [Validators.required, Validators.min(1)]],
      annual_revenue: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.userData = this.userInfoService.getUserData();

    if (
      this.userData?.phoneVerified == false ||
      this.userData?.emailVerified == false
    ) {
      this.router.navigate(['verification']);
    }

    if (
      this.userData?.isActive == true &&
      this.userData?.documentsSubmitted == false
    ) {
      this.router.navigate(['documents']);
    }
    if (this.userData?.isApproved == true) {
    }
    this.businessForm.patchValue({ email: this.userData!.email });
  }

  onSubmit() {
    if (this.businessForm.valid) {
      const formData = { ...this.businessForm.getRawValue() }; // getRawValue() includes disabled fields

      this.businessService
        .submitBusinessDetails(formData, this.userInfoService.getSessionToken())
        .subscribe(
          (response) => {
            this.activateUser();
            console.log('Business details submitted successfully:', response);
            alert('Submission successful!');
            this.router.navigate(['documents']);
          },
          (error) => {
            console.error('Error submitting business details:', error);
            alert('Submission failed. Please try again.');
          }
        );
    }
  }

  activateUser() {
    console.log('we are in');
    this.businessService
      .updateBusinessInfo(
        {
          email: this.userData!.email,
        },
        this.userInfoService.getSessionToken()
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  startShopping() {
    this.router.navigate(['products']);
  }
}
