import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const authService = inject(AuthService);

  
  const isLoggedIn = authService.isLoggedIn()

  if (isLoggedIn) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
