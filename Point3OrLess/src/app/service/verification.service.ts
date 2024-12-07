import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private phoneVerificationApi =
    'https://nth7u9lr3i.execute-api.us-east-2.amazonaws.com/Stage1/twilio';
  private emailVerificationApi =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/emailVerification'; // Replace with actual email verification endpoint
  private phoneVerificationEndpoint =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/phoneVerification'; // Third endpoint

  constructor(private http: HttpClient) {}

  // Send phone verification code
  sendPhoneCode(phoneNumber: string): Observable<any> {
    // console.log('we are in the verification service ' + phoneNumber);
    const payload = { phoneNumber: `+1${phoneNumber}` };
    // console.log(payload);
    return this.http.put(this.phoneVerificationApi, JSON.stringify(payload));
  }

  // Validate phone verification code
  validatePhoneCode(phoneNumber: string, code: string): Observable<any> {
    const payload = { phoneNumber: `+1${phoneNumber}`, code };
    return this.http.post(this.phoneVerificationApi, JSON.stringify(payload));
  }

  // Send email verification request
  sendEmailVerification(email: string, jwt: string): Observable<any> {
    // const payload = { email };
    // console.log(this.emailVerificationApi + '?email=' + email + '&jwt=' + jwt);
    //point3orless.com/email/sendVerificationEmail.php?email=salman@salmansaeed.us&jwt=your-jwt-token
    https: return this.http.get(
      this.emailVerificationApi + '?email=' + email + '&jwt=' + jwt
    );
  }

  // Send email verification request to the third endpoint with JWT token in the header (using PUT)
  sendPhoneVerificationWithJwtToDynamoDB(
    email: string,
    jwtToken: string
  ): Observable<any> {
    const payload = { email };
    // console.log(payload);
    const headers = new HttpHeaders({
      Authorization: jwtToken, // Add the JWT token in the Authorization header
    });

    // PUT request to the third endpoint
    return this.http.put(this.phoneVerificationEndpoint, payload, { headers });
  }
}
