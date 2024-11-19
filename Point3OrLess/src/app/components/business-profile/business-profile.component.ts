import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css'],
})
export class BusinessProfileComponent implements OnInit {
  userData: any;

  constructor(
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.userInfoService.getUserData();

    if (
      this.userData?.phoneVerified == false ||
      this.userData?.emailVerified == false
    ) {
      this.router.navigate(['verification']);
    }
  }
}
