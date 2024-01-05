import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IChapter, ICourse } from 'src/app/tutor/models/ICourse';
import { UserCourseService } from '../../services/user-course.service';
import { ActivatedRoute } from '@angular/router';
import { IEnrolledCourse } from 'src/app/models/IEnrolledCourse';
import { VgApiService as VgAPI } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enrolled-course-view',
  templateUrl: './enrolled-course-view.component.html',
  styleUrls: ['./enrolled-course-view.component.css'],
})
export class EnrolledCourseViewComponent implements OnInit, OnDestroy {
  courseData: IEnrolledCourse;
  currentChapter: IChapter;
  @ViewChild('media') media: any;
  api: VgAPI | undefined;
  private _subscription: Subscription | undefined;

  constructor(
    private _userCourseService: UserCourseService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEnrolledCourseData();
  }

  // getEnrolledCourseData(){
  //   const courseId = this._route.snapshot.paramMap.get('id');
  //   const userId = localStorage.getItem('user')
  //   this._userCourseService.getEnrolledCourseData(courseId,userId).subscribe({
  //     next:(course)=>{
  //       this.courseData = course
  //       if (this.courseData?.courseId?.chapters.length) {
  //         this.playChapter(this.courseData?.courseId.chapters[0].chapter);
  //       }

  //     },
  //     error:(error)=>{
  //       console.log(error);
  //     }
  //   })
  // }

  getEnrolledCourseData() {
    const courseId = this._route.snapshot.paramMap.get('id');
    const userId = localStorage.getItem('user');
    this._userCourseService.getEnrolledCourseData(courseId, userId);
    this._subscription = this._userCourseService.enrolledCourseData$.subscribe({
      next: (course) => {
        this.courseData = course;
        if (this.courseData?.courseId?.chapters.length) {
          this.playChapter(this.courseData?.courseId.chapters[0].chapter);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.onVideoEnded();
    });
  }

  playChapter(chapter: IChapter) {
    this.currentChapter = chapter;
  }

  onVideoEnded() {
    const completeChapterId = this.currentChapter._id;
    if (!this.courseData.progression.includes(completeChapterId)) {
      this.courseData.progression.push(completeChapterId);
      this._userCourseService
        .updateEnrolledCourseProgression(
          this.courseData.courseId._id,
          completeChapterId
        )
        .subscribe({
          next: (updatedData) => {
            this.getEnrolledCourseData();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  isCompleted(chapterId: string): boolean {
    return this.courseData.progression.includes(chapterId);
  }

  ngOnDestroy(): void {
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }
}

