import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserInfoService } from '../../service/user-info.service';
import { BusinessService } from '../../service/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
})
export class FileUploadComponent implements OnInit {
  file: File | null = null;
  statusMessage: string = '';
  email: string = ''; // Replace with dynamic user email if needed
  businessId: string = '1'; // Replace with dynamic business ID
  userGivenName: string = ''; // This will be provided by the user
  selectedFile: any = null;

  constructor(
    private http: HttpClient,
    private user: UserInfoService,
    private businessInfo: BusinessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.user.getUserData().email;
    this.businessInfo.getBusinessByEmail(this.email, '').subscribe(
      (response) => {
        this.businessId = response.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // On file select
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.file = this.selectedFile;
    }
    this.statusMessage = ''; // Reset status message
  }

  //clear fields
  clearFields(): void {
    // alert("File was uploaded Successfull");
    this.selectedFile = null; // Reset the file selection
    this.userGivenName = ''; // Clear the display name input

    // Optionally, you can reset the file input element manually if needed:
    const fileInput: any = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ''; // Clear the file input value
    }
  }

  // Convert file to base64 and upload to API
  uploadFile() {
    if (!this.file) {
      this.statusMessage = 'Error Please select a file to upload.';
      return;
    }
    if (!this.userGivenName) {
      this.statusMessage = 'Error Please give your file a name.';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64File = (reader.result as string).split(',')[1]; // Extract the base64 part

      const payload = {
        fileInformation: {
          fileName: this.file?.name,
          fileType: this.file?.type,
        },
        body: base64File,
        email: this.email,
        businessId: this.businessId,
        userGivenName: this.userGivenName, // User's name that will be added dynamically
      };

      // Call the Lambda API
      this.http
        .post<any>(
          'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/api/businesses-profiles',
          payload
        )
        .pipe(
          catchError((error) => {
            this.statusMessage = 'Error uploading file: ' + error.message;
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            this.statusMessage = 'File uploaded successfully!';
            this.clearFields();
          }
        });
    };

    reader.readAsDataURL(this.file);
  }

  updateActivation() {
    this.businessInfo
      .updateDocumentSubmission(
        { email: this.email, status: 'review requested' },
        this.user.getSessionToken()
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    this.router.navigate(['/login']);
  }
}
