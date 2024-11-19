import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userData: any = null;
  private sessionToken: string = '';

  constructor() {}
  //set token

  setSessionToaken(token: string) {
    this.sessionToken = token;
  }

  getSessionToken() {
    return this.sessionToken;
  }
  // Set entire user data object
  setUserData(data: any): void {
    this.userData = data;
    console.log('User data updated:', this.userData);
  }

  // Set only the user info section of userData
  setUserInfo(info: any): void {
    if (!this.userData) this.userData = {};
    this.userData = { ...this.userData, ...info }; // Merge with existing data
    console.log('User info updated:', info);
  }

  // Set only the address section of userData
  setUserAddress(address: any): void {
    if (!this.userData) this.userData = {};
    this.userData = { ...this.userData, address }; // Set the address in userData
    console.log('User address updated:', address);
  }

  // Get entire user data object
  getUserData(): any {
    return this.userData;
  }

  // Check if the user is approved
  isUserApproved(): boolean {
    return this.userData?.isApproved === true;
  }

  // Get the user's full name
  getUserName(): string {
    return `${this.userData?.firstName} ${this.userData?.lastName}`;
  }

  // Get just the user’s address
  getUserAddress(): any {
    return this.userData?.address;
  }
}
