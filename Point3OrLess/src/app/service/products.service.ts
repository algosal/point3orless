import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Updated class name to ProductsService
  private apiUrl = 'https://5qka82drej.execute-api.us-east-2.amazonaws.com/v1';

  constructor(private http: HttpClient) {}

  // Method to fetch product data from the API
  getProducts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
