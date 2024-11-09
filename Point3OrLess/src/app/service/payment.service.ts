import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://your-backend.com/api/payment'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  processPayment(nonce: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nonce }); // Send the nonce to the backend for processing
  }
}
