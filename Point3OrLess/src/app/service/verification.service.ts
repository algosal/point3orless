import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private phoneVerificationApi =
    'https://nth7u9lr3i.execute-api.us-east-2.amazonaws.com/Stage1/twilio';
  private emailVerificationApi = 'https://your-backend-api/email-verification'; // Replace with actual email verification endpoint

  constructor(private http: HttpClient) {}

  // Send phone verification code
  sendPhoneCode(phoneNumber: string): Observable<any> {
    console.log('we are in the verification service ' + phoneNumber);
    const payload = { phoneNumber: `+1${phoneNumber}` };
    console.log(payload);
    return this.http.put(this.phoneVerificationApi, JSON.stringify(payload));
  }

  // Validate phone verification code
  validatePhoneCode(phoneNumber: string, code: string): Observable<any> {
    const payload = { phoneNumber: `+1${phoneNumber}`, code };
    return this.http.post(this.phoneVerificationApi, JSON.stringify(payload));
  }

  // Send email verification request
  sendEmailVerification(email: string): Observable<any> {
    const payload = { email };
    return this.http.post(this.emailVerificationApi, payload);
  }
}
