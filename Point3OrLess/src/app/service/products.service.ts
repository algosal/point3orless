import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://5qka82drej.execute-api.us-east-2.amazonaws.com/v1';
  private products: any[] = []; // Array to store the products

  constructor(private http: HttpClient) {}

  // Method to fetch product data from the API
  getProducts(): Observable<any[]> {
    // Check if products are already fetched
    if (this.products.length > 0) {
      // Return cached products as an observable
      return of(this.products);
    }

    // If products are not fetched yet, fetch from the API
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError<any[]>('getProducts', [])),
      tap((products) => {
        this.products = products; // Cache the fetched products
      })
    );
  }

  // Method to handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error
      return of(result as T); // Return an empty result to keep the app running
    };
  }
}
