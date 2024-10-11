import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/Users'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Method to handle user login
  login(credentials: { email: string; userPassword: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}`, credentials); // Allow cookies to be sent with the request
  }

  // Method to get the JWT token from cookies
  getJwtToken(): string | null {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'jwt_token') {
        return value; // Return the JWT token
      }
    }
    return null; // Return null if the token is not found
  }

  // Method to clear the JWT token (logout)
  clearToken() {
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'; // Clear the token
  }
}
