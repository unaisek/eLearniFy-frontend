import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { LoginResponse, User } from '../models/IuserLogin';
import { ICategory } from '../models/ICategory';
import { IUser } from '../models/Iusesr';
import { BlockUserResponse } from '../models/IResponse';
import { IAdminDashboardData } from '../models/IAdminDashboardData';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}



@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl: string = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) {}

  adminLogin(user: User): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      `${this.apiUrl}/admin/login`,
      user,
      httpOptions
    );
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this._http.post<ICategory>(
      `${this.apiUrl}/admin/add-category`,
      category,
      httpOptions
    );
  }

  getAllCategory(): Observable<[ICategory]> {
    return this._http.get<[ICategory]>(
      `${this.apiUrl}/admin/categories`,
      httpOptions
    );
  }

  getAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(
      `${this.apiUrl}/admin/users-list`,
      httpOptions
    );
  }

  blockUser(id: string): Observable<BlockUserResponse> {
    return this._http.put<BlockUserResponse>(
      `${this.apiUrl}/admin/user-block/${id}`,
      httpOptions
    );
  }

  unBlockUser(id: string): Observable<BlockUserResponse> {
    return this._http.put<BlockUserResponse>(
      `${this.apiUrl}/admin/user-unblock/${id}`,
      httpOptions
    );
  }

  getAdminDashboard(): Observable <IAdminDashboardData>{
    return this._http.get<IAdminDashboardData>(`${env.apiUrl}/admin/dashboard`);
  }
}
