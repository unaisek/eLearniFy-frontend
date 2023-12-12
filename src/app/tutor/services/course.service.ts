import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment as env } from 'src/environments/environment';
import { ICourse, addCourseResponse } from '../models/ICourse';



@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http:HttpClient) { }

  addNewCourse(formData:FormData): Observable <addCourseResponse>{
    // const headers = new HttpHeaders().set('Content-Type','multipart/form-data')
    return this._http.post<addCourseResponse>(`${env.apiUrl}/tutor/add-course`,formData)
  }

  getAllMyCourses():Observable<ICourse[]>{
    const tutorId = localStorage.getItem('user')
    return this._http.get<ICourse[]>(`${env.apiUrl}/tutor/all-courses/${tutorId}`)
  }

  getCourseDetails(courseId:string): Observable <ICourse>{
    return this._http.get<ICourse>(`${env.apiUrl}/tutor/view-course/${courseId}`)
  }

  
}
