import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment as env } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient) { }

  userRegister(user:any):Observable <any>{
    return this.http.post(`${env.apiUrl}/register`, user, httpOptions)
  }

  userVerification(id:string,otp:string):Observable<any>{
    // return this.http.post(`${env.apiUrl}/verification?id=${id}`, otp, httpOptions)
    const requestBody = { id:id, otp:otp }; // Construct request body object

    return this.http.post(`${env.apiUrl}/verification`, requestBody, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          throw error;
        })
      );
  }

  userLogin(user:any): Observable<any>{
    return this.http.post(`${env.apiUrl}/login`,user,httpOptions);
  }

  userReverification(user:any): Observable<any>{
    return this.http.post(`${env.apiUrl}/reverification`,user,httpOptions)
  }
}
