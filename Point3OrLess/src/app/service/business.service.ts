import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private baseUrl =
    'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/api/businesses-profiles/info-only';
  private getBusinessesURL =
    'https://point3orless.com/point3-or-less-api/public/api/businesses';

  private businessInfo: any = null;

  constructor(private http: HttpClient) {}

  // Function to submit business details
  submitBusinessDetails(data: any, jwt: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: jwt, // Replace with the actual token or retrieve dynamically
    });
    return this.http.post(this.baseUrl, data, { headers });
  }

  // Function to update email
  updateBusinessInfo(data: { email: string }, jwt: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: jwt, // Replace with the actual token or retrieve dynamically
    });
    return this.http.put(this.baseUrl, data, { headers });
  }

  // Function to get business by email
  getBusinessByEmail(email: string, jwt: string): Observable<any> {
    if (this.businessInfo) {
      return this.businessInfo;
    }
    const headers = new HttpHeaders({
      Authorization: jwt, // Replace with the actual token or retrieve dynamically
    });
    const url = `${this.getBusinessesURL}/${email}`; // Construct the endpoint
    this.businessInfo = this.http.get(url, { headers });
    return this.businessInfo;
  }

  updateDocumentSubmission(
    data: { email: string; status: string },
    jwt: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: jwt, // Replace with the actual token or retrieve dynamically
    });
    return this.http.put(
      'https://xu4z97vz6l.execute-api.us-east-2.amazonaws.com/v1/documentSubmission',
      data,
      { headers }
    );
  }
}
