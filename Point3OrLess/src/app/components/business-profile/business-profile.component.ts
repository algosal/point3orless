import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css'],
})
export class BusinessProfileComponent implements OnInit {
  userData: any;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit(): void {
    this.userData = this.userInfoService.getUserData();
  }
}
