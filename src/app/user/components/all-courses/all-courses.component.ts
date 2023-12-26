import { Component,OnInit } from '@angular/core';
import { ICourse } from 'src/app/tutor/models/ICourse';
import { CourseService } from 'src/app/tutor/services/course.service';
import { UserCourseService } from '../../services/user-course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit{

  courseList:ICourse[];
  constructor(
    private _courseService:UserCourseService
  ){
  }

  ngOnInit(): void {
    this.getAllCourse()
  }
  getAllCourse(){
    this._courseService.getAllCoursesForStudent().subscribe({
      next:(courses)=>{
        this.courseList= courses
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

}
