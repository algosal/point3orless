// user-info.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userData: any = null;

  constructor() {}

  setUserData(data: any): void {
    this.userData = data;
    console.log(data);
  }

  getUserData(): any {
    return this.userData;
  }

  isUserApproved(): boolean {
    return this.userData?.isApproved === 'Yes';
  }

  getUserName(): string {
    return `${this.userData?.firstName} ${this.userData?.lastName}`;
  }
}
