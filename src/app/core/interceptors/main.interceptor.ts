import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {   
    const urlSegment = request.url.split('/');   
    const userType = urlSegment[4];
    let token:string;
    
    if(userType == "admin"){
      token = localStorage.getItem('adminAuthToken');
    } else if( userType == "tutor"){
      token = localStorage.getItem("tutorAuthToken")
    } else {
      token = localStorage.getItem("authToken")
    }
    
    if(token){
      const newReq = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return next.handle(newReq)
    } 
    return next.handle(request)
  }
}