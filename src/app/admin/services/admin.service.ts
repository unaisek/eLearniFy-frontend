import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { LoginResponse, User } from '../models/IuserLogin';
import { ICategory } from '../models/ICategory';
import { IUser } from '../models/Iusesr';
import { BlockUserResponse } from '../models/IResponse';
import { IAdminDashboardData } from '../models/IAdminDashboardData';
import { IEnrolledCourse } from '../../models/IEnrolledCourse';




@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(private _http: HttpClient) {}

  adminLogin(user: User): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${env.apiUrl}/admin/login`, user);
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this._http.post<ICategory>(
      `${env.apiUrl}/admin/add-category`,
      category
    );
  }

  getAllCategory(): Observable<[ICategory]> {
    return this._http.get<[ICategory]>(`${env.apiUrl}/admin/categories`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${env.apiUrl}/admin/users-list`);
  }

  blockUser(userId: string): Observable<BlockUserResponse> {
    return this._http.patch<BlockUserResponse>(
      `${env.apiUrl}/admin/user-block`,
      userId
    );
  }

  unBlockUser(userId: string): Observable<BlockUserResponse> {
    return this._http.patch<BlockUserResponse>(
      `${env.apiUrl}/admin/user-unblock`,
      userId
    );
  }

  getAdminDashboard(): Observable<IAdminDashboardData> {
    return this._http.get<IAdminDashboardData>(`${env.apiUrl}/admin/dashboard`);
  }

  getAllEnrolledCourse( year: number):Observable <IEnrolledCourse[]>{
    return this._http.get<IEnrolledCourse[]>(`${env.apiUrl}/admin/enrolled-courses/${year}`)
  }
}
