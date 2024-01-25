import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../models/IUser';
import { IWallet } from '../../models/IWallet';
import { environment as env } from '../../../environments/environment';
import { ICoupon } from '../../models/ICoupon';
import { ICategory } from '../../models/ICategory';

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

  getAvailableCoupons(userId:string):Observable<ICoupon[]>{
    return this._http.get<ICoupon[]>(`${env.apiUrl}/user/all-coupons/${userId}`)
  }

  applyCoupon(couponId:string, courseId:string,userId:string): Observable<ICoupon>{
    return this._http.get<ICoupon>(`${env.apiUrl}/user/apply-coupon?couponId=${couponId}&courseId=${courseId}&userId=${userId}`);
  }

  getAllCategories():Observable<ICategory[]>{
    return this._http.get<ICategory[]>(`${env.apiUrl}/user/categories`);
  }
}
