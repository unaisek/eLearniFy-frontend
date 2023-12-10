import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment as env } from 'src/environments/environment';
import { addCourseResponse } from '../models/ICourse';



@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http:HttpClient) { }

  addNewCourse(formData:FormData): Observable <addCourseResponse>{
    // const headers = new HttpHeaders().set('Content-Type','multipart/form-data')
    return this._http.post<addCourseResponse>(`${env.apiUrl}/tutor/add-course`,formData)
  }

  
}
