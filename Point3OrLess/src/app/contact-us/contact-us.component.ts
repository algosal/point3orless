import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../service/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],
})
export class ContactUsComponent {
  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  messageSent = false; // Flag to track if message was sent successfully

  constructor(private contactService: ContactService) {}

  onSubmit() {
    console.log(this.contactForm);
    this.contactService.sendMessage(this.contactForm).subscribe(
      (response) => {
        console.log('Message sent successfully', response);
        this.messageSent = true; // Set flag to true
        this.resetForm(); // Reset form fields
      },
      (error) => {
        console.error('Error sending message', error);
        alert('Message was not Sent');
      }
    );
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      message: '',
    };
  }
}
