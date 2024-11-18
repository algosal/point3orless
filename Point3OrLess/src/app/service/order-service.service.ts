import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1'; // Base URL for your API
  private clientOrdersURL =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/client-orders';
  private clientOrderDetailsURL = '';
  constructor(
    private http: HttpClient,
    private userInfoService: UserInfoService
  ) {}

  // Helper function to get authorization headers
  private getHeaders(): HttpHeaders {
    const token = this.userInfoService.getSessionToken();
    return new HttpHeaders({
      Authorization: `${token}`, // Include JWT token in the Authorization header
      'Content-Type': 'application/json',
    });
  }

  // Get orders
  getOrders(email: string): Observable<any> {
    console.log('the email from the service', email);
    const url = `${this.clientOrdersURL}?email=${email}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Get order details
  getOrderDetails(orderId: number, email: string): Observable<any> {
    const url = `${this.baseUrl}/client-order-details?order_id=${orderId}&email=${email}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
}
