import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = '/api/contact'; // Replace with your actual endpoint

  constructor(private http: HttpClient) {}

  sendMessage(contactForm: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, contactForm);
  }
}
