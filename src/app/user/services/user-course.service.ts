import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEnrolledCourse } from '../../models/IEnrolledCourse';
import { IReview } from '../../models/IReview';
import { ICourse } from '../../tutor/models/ICourse';
import { environment as env } from '../../../environments/environment';
import { IFilter } from '../../models/IFilter';

@Injectable({
  providedIn: 'root',
})
export class UserCourseService {
  enrolledCourseData$ = new Subject<IEnrolledCourse>();

  constructor(private _http: HttpClient) {}

  getAllCoursesForStudentHome(): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(`${env.apiUrl}/user/home-courses`);
  }

  getAllCoursesForStudent(filterValues: IFilter): Observable<ICourse[]> {
    const params = new HttpParams({ fromObject: filterValues as any });
    console.log(params);
    
    return this._http.get<ICourse[]>(`${env.apiUrl}/user/all-courses`, {
      params,
    });
  }

  getCourseDetails(courseId: string): Observable<ICourse> {
    return this._http.get<ICourse>(
      `${env.apiUrl}/user/course-overView/${courseId}`
    );
  }

  enrollCourse(
    userId: string,
    courseId: string,
    couponId: string
  ): Observable<any> {
    const body = { userId, courseId, couponId };
    return this._http.post(`${env.apiUrl}/user/enroll-course`, body);
  }

  getEnrolledCourses(userId: string): Observable<IEnrolledCourse[]> {
    return this._http.get<IEnrolledCourse[]>(
      `${env.apiUrl}/user/my-courses/${userId}`
    );
  }

  cancelEnrolledCourse(courseId: string): Observable<IEnrolledCourse> {
    const userId = localStorage.getItem('user');
    const body = { courseId, userId };
    return this._http.post<IEnrolledCourse>(
      `${env.apiUrl}/user/cancel-course`,
      body
    );
  }

  // getEnrolledCourseData(
  //   courseId: string,
  //   userId: string
  // ): Observable<IEnrolledCourse> {
  //   return this._http.get<IEnrolledCourse>(
  //     `${env.apiUrl}/user/enrolled-course?courseId=${courseId}&userId=${userId}`
  //   );
  // }

  getEnrolledCourseData(courseId: string, userId: string): void {
    this._http
      .get<IEnrolledCourse>(
        `${env.apiUrl}/user/enrolled-course?courseId=${courseId}&userId=${userId}`
      )
      .subscribe((data) => {
        this.enrolledCourseData$.next(data);
      });
  }

  updateEnrolledCourseProgression(
    courseId: string,
    chapterId: string
  ): Observable<IEnrolledCourse> {
    const userId = localStorage.getItem('user');
    const body = { userId, courseId, chapterId };
    return this._http.put<IEnrolledCourse>(
      `${env.apiUrl}/user/update-progression`,
      body
    );
  }

  addReview(
    courseId: string,
    userId: string,
    review: IReview
  ): Observable<IReview> {
    const body = { courseId, userId, review };
    return this._http.post<IReview>(`${env.apiUrl}/user/add-review`, body);
  }

  getAllReview(courseId: string): Observable<IReview[]> {
    return this._http.get<IReview[]>(`${env.apiUrl}/user/review/${courseId}`);
  }

  addRating(
    courseId: string,
    userId: string,
    rating: number
  ): Observable<IReview> {
    const body = { courseId, userId, rating };
    return this._http.post<IReview>(`${env.apiUrl}/user/add-rating`, body);
  }
}
