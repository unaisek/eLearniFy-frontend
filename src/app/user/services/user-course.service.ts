import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnrolledCourse } from 'src/app/models/IEnrolledCourse';
import { ICourse } from 'src/app/tutor/models/ICourse';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserCourseService {
  constructor(private _http: HttpClient) {}

  getAllCoursesForStudent(): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(`${env.apiUrl}/user/all-courses`);
  }

  getCourseDetails(courseId: string): Observable<ICourse> {
    return this._http.get<ICourse>(
      `${env.apiUrl}/user/course-overView/${courseId}`
    );
  }

  enrollCourse(userId: string, courseId: string): Observable<any> {
    const body = { userId, courseId };
    return this._http.post(`${env.apiUrl}/user/enroll-course`, body);
  }

  getEnrolledCourses(userId: string): Observable<IEnrolledCourse[]> {
    return this._http.get<IEnrolledCourse[]>(
      `${env.apiUrl}/user/my-courses/${userId}`
    );
  }

  cancelEnrolledCourse(courseId: string): Observable <IEnrolledCourse>{
    const userId = localStorage.getItem('user');
    const body = { courseId, userId };
    return this._http.post<IEnrolledCourse>(`${env.apiUrl}/user/cancel-course`,body);
  }
}
