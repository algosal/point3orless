// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userInfoService = inject(UserInfoService); // Inject the UserInfoService
  const router = inject(Router);

  if (userInfoService.isUserApproved()) {
    return true; // Allow access to the route
  } else {
    router.navigate(['/unauthorized']);
    return false; // Deny access to the route
  }
};