import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TutorService {
  constructor(private _http: HttpClient) {}

  getCategory(): Observable<[ICategory]> {
    return this._http.get<[ICategory]>(`${environment.apiUrl}/tutor/category`)
  }
}
