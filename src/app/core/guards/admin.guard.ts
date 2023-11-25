import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'


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
