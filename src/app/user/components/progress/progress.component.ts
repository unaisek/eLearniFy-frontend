import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/tutor/models/ICourse';
import { UserCourseService } from '../../services/user-course.service';
import { IEnrolledCourse } from 'src/app/models/IEnrolledCourse';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  courseData: IEnrolledCourse[];


  constructor(
    private _userCourseService: UserCourseService,
    private _conirmModalService: ConfirmModalService,
    private _toastrService: ToastrService
    ) {}

  ngOnInit(): void {
    this.getEnrolledCourses();
  }

  getEnrolledCourses() {
    const userId = localStorage.getItem('user');
    this._userCourseService.getEnrolledCourses(userId).subscribe({
      next: (res) => {
        this.courseData = res;
      },
    });
  }

  isCourseExpired(date: string): boolean {
    const courseCreatedDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime =
      currentDate.getTime() - courseCreatedDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 15;
  }

  cancelCourse(courseId:string){
    this._conirmModalService.confirmModal({
      title:"Please confirm action",
      message: "Are you sure want cancel this Course.?" ,
      confirmText:"Yes",
      cancelText:"No"
    }).subscribe((confirm)=>{
      if(confirm){
        this._userCourseService.cancelEnrolledCourse(courseId).subscribe((res)=>{
          console.log(res);          
          this._toastrService.success("Course Cancelled");
          this.getEnrolledCourses();        
        })
      }
    })
  }

  calculateProgression(course:IEnrolledCourse): number {
    const totalChapter = course.courseId.chapters.length;
    const completeChapter = course.progression.length;

    const percentage = Math.floor((completeChapter/totalChapter)*100)
    return percentage
  }
}
