import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment as env } from 'src/environments/environment';
import { IChapter, ICourse, addCourseResponse } from '../models/ICourse';



@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private _http: HttpClient) {}

  private _courseDetailsSubject: BehaviorSubject<ICourse | null> =
    new BehaviorSubject<ICourse | null>(null);
  public courseDetails$: Observable<ICourse | null> =
    this._courseDetailsSubject.asObservable();

  addNewCourse(formData: FormData): Observable<addCourseResponse> {
    // const headers = new HttpHeaders().set('Content-Type','multipart/form-data')
    return this._http.post<addCourseResponse>(
      `${env.apiUrl}/tutor/add-course`,
      formData
    );
  }

  getAllMyCourses(): Observable<ICourse[]> {
    const tutorId = localStorage.getItem('user');
    return this._http.get<ICourse[]>(
      `${env.apiUrl}/tutor/all-courses/${tutorId}`
    );
  }

  getCourseDetails(courseId: string): void {
    this._http
      .get<ICourse>(`${env.apiUrl}/tutor/view-course/${courseId}`)
      .subscribe(
        (courseData) => {
          this._courseDetailsSubject.next(courseData);
        },
        (err) => {
          console.log('error while fetching coursData', err);
        }
      );
  }

  updateCourse(formData: FormData, courseId: string): Observable<ICourse> {
    //  const headers = new HttpHeaders();
    //  headers.append('Content-Type', 'multipart/form-data');
    return this._http
      .put<ICourse>(`${env.apiUrl}/tutor/update-course/${courseId}`, formData)
      .pipe(
        tap((updatedCourse) => {
          // After successful update, emit the updated course details
          this._courseDetailsSubject.next(updatedCourse);
          console.log(this.courseDetails$);
        })
      );
  }

  updateChapter(chapterId: string, formData: FormData): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this._http.put(
      `${env.apiUrl}/tutor/update-chapter/${chapterId}`,
      formData
    );
  }

  addNewChapter(formData: FormData, courseId: string): Observable<any> {
    return this._http.post(
      `${env.apiUrl}/tutor/add-chapter/${courseId}`,
      formData
    );
  }

  unListCourse(courseId:string): Observable<ICourse>{
    const body = { status:false}
    return this._http.put<ICourse>(`${env.apiUrl}/tutor/unlist-course/${courseId}`,body);
  }

  listCourse(courseId:string):Observable<ICourse>{
    const body = {status:true};
    return this._http.put<ICourse>(`${env.apiUrl}/tutor/list-course/${courseId}`,body)
  }
}
