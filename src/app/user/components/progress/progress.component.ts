import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/tutor/models/ICourse';
import { UserCourseService } from '../../services/user-course.service';
import { IEnrolledCourse } from 'src/app/models/IEnrolledCourse';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  courseData:IEnrolledCourse[];
  constructor(
    private _userCourseService:UserCourseService
  ) {}
  ngOnInit(): void {
    this.getEnrolledCourses()
  }

  getEnrolledCourses(){
    const userId = localStorage.getItem('user')
    this._userCourseService.getEnrolledCourses(userId).subscribe({
      next:(res)=>{
        this.courseData = res;
      }
    })
  }
}
