import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const studentGuard: CanActivateFn = (_route, _state) => {
  const token = localStorage.getItem('user');
  const router = inject(Router);

  if(token){
    return true;
  } else {
    router.navigate(['/login']);
    return false
  }
};
