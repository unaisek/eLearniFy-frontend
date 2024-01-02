import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { IWallet } from 'src/app/models/IWallet';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http:HttpClient
  ) { }

  
  getUserData(userId:string): Observable<IUser>{
    return this._http.get<IUser>(`${env.apiUrl}/user/profile/${userId}`);
  }

  uploadProfile(formData:FormData): Observable<any>{  
    return this._http.post(`${env.apiUrl}/user/upload-profile`,formData);
  }

  getWalletData(userId: string): Observable <IWallet>{
    return this._http.get<IWallet>(`${env.apiUrl}/user/wallet/${userId}`);
  }
}
