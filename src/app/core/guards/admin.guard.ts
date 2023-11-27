import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { state } from '@angular/animations';


export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('adminAuthToken');
  const router = inject(Router);
  if(token){
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};

export const adminGuardLet: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('adminAuthToken');
  const router = inject(Router);
  if(!token){
    return true;
  } else{
    router.navigate(['/admin/dashboard']);
    return false;
  }
}
