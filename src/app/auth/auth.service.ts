import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment as env } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  userRegister(user: any): Observable<any> {
    return this._http.post(`${env.apiUrl}/auth/register`, user);
  }

  resendOtp(email: string): Observable<any> {
    const requestBody = { email: email}
    return this._http.post(`${env.apiUrl}/auth/resendOtp`,requestBody);
  }

  userVerification(email: string, otp: string): Observable<any> {
    // return this.http.post(`${env.apiUrl}/verification?id=${id}`, otp, httpOptions)
    const requestBody = { email: email, otp: otp }; // Construct request body object

    return this._http.post(`${env.apiUrl}/auth/verification`, requestBody).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  userLogin(user: any): Observable<any> {
    return this._http.post(`${env.apiUrl}/auth/login`, user);
  }

  userReverification(user: any): Observable<any> {
    return this._http.post(`${env.apiUrl}/auth/reverification`, user);
  }
}
