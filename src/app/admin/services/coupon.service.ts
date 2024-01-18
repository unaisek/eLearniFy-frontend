import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoupon } from '../../models/ICoupon';
import { environment as env } from '../../../environments/environment';
import { AdminModule } from '../admin.module';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private _http: HttpClient) {}

  addNewCoupon(couponData: ICoupon): Observable<ICoupon> {
    return this._http.post(`${env.apiUrl}/admin/add-coupon`, couponData);
  }

  getAllCoupons(): Observable<ICoupon[]> {
    return this._http.get<ICoupon[]>(`${env.apiUrl}/admin/coupons`);
  }

  updateCoupon(couponId: string, couponData: ICoupon): Observable<ICoupon> {
    const body = { couponId, couponData };
    return this._http.put<ICoupon>(`${env.apiUrl}/admin/update-coupon`, body);
  }

  unlistCoupon(couponId: string): Observable<ICoupon> {
    const body = { couponId };
    return this._http.put<ICoupon>(`${env.apiUrl}/admin/unlist-coupon`, body);
  }

  listCoupon(couponId: string): Observable<ICoupon> {
    const body = { couponId };
    return this._http.put<ICoupon>(`${env.apiUrl}/admin/list-coupon`, body);
  }
}
