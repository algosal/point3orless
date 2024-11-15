import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiUrl =
    'https://financialdata.us/point3orless/api/dynamic_price_restriction.php'; // Replace with your PHP endpoint URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch the latest price from the server
   * @returns Observable with the price or error
   */
  getLatestPrice(): Observable<number> {
    return this.http
      .get<{ success: boolean; price_restriction?: number; message?: string }>(
        this.apiUrl
      )
      .pipe(
        map((response) => {
          if (response.success && response.price_restriction !== undefined) {
            return response.price_restriction;
          } else {
            throw new Error(response.message || 'Failed to fetch the price');
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error The HTTP error response
   * @returns Observable that throws the error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
