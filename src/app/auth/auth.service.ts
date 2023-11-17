import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
