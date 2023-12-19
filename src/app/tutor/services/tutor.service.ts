import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private _categorySubject: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);
  categoryList$: Observable<ICategory[]> = this._categorySubject.asObservable();

  constructor(private _http: HttpClient) {
    this.getCategory();
  }

  getCategory(): void {
    this._http
      .get<[ICategory]>(`${environment.apiUrl}/tutor/category`)
      .subscribe({
        next:(categories) => {
          this._categorySubject.next(categories);
        },
        error:(error) => {
          console.error('Error fetching categories: ', error);
        }
    });
  }
}
