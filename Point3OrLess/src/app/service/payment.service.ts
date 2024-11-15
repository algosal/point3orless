import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/credit-card-state-machine-sync'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  processPayment(FirstState: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, FirstState); // Send the nonce to the backend for processing
  }
}
