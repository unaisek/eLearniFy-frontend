import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, retry } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/models/IUser';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { IWallet } from 'src/app/models/IWallet';


@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private _categorySubject: BehaviorSubject<ICategory[]> = new BehaviorSubject<
    ICategory[]
  >([]);
  categoryList$: Observable<ICategory[]> = this._categorySubject.asObservable();

  constructor(private _http: HttpClient) {
    this.getCategory();
  }

  getCategory(): void {
    this._http
      .get<[ICategory]>(`${environment.apiUrl}/tutor/category`)
      .subscribe({
        next: (categories) => {
          this._categorySubject.next(categories);
        },
        error: (error) => {
          console.error('Error fetching categories: ', error);
        },
      });
  }

  getTutorData(userId: string): Observable<IUser> {
    return this._http.get<IUser>(
      `${environment.apiUrl}/tutor/profile/${userId}`
    );
  }

  uploadProfile(formData: FormData): Observable<IUser> {
    return this._http.put<IUser>(
      `${environment.apiUrl}/tutor/upload-profile`,
      formData
    );
  }

  getWalletData(tutorId:string): Observable<IWallet>{
    return this._http.get<IWallet>(
      `${environment.apiUrl}/tutor/wallet/${tutorId}`
    )
  }

}
