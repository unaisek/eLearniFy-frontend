import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tutorGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('tutorAuthToken');
  const router = inject(Router);

  if(token){
    return true
  } else{
    router.navigate(['/login']);
    return false
  }
};

export const adminGuardLet: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('tutorAuthToken');
  const router = inject(Router);
  if (!token) {
    return true;
  } else {
    router.navigate(['/tutor']);
    return false;
  }
};
