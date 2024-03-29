import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ICourse, addCourseResponse } from '../models/ICourse';
import { IReview } from 'src/app/models/IReview';



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
      .subscribe({
        next:(courseData) => {
          this._courseDetailsSubject.next(courseData);
        },
        error:(err) => {
          console.log('error while fetching coursData', err);
        }
      });
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
    return this._http.put<ICourse>(`${env.apiUrl}/tutor/list-course/${courseId}`,body);
  }

  deleteChapter(courseId:string,chapterId:string) : Observable <ICourse>{
    const body = { courseId,chapterId}
    return this._http.put<ICourse>(`${env.apiUrl}/tutor/delete-chapter`,body);
  }

  getAllReviews(courseId:string):Observable <IReview[]>{
    return this._http.get<IReview[]>(`${env.apiUrl}/tutor/reviews/${courseId}`)
  }
}
