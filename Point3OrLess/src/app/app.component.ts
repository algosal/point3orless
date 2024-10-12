import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInfoService } from './service/user-info.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Point3OrLess';

  ngOnInit() {}
  constructor(
    private router: Router,
    private userInforService: UserInfoService
  ) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  navigateToProfile(path: string) {
    if (this.userInforService.getUserData() !== null) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
