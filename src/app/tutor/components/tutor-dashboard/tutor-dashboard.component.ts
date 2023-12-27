import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {

  myCourses = []
  constructor(
    private _courseService:CourseService,
    private _toastr:ToastrService
  ){

  }

  ngOnInit(): void {
    this.getMyAllCourses();
  }

  getMyAllCourses(){
    this._courseService.getAllMyCourses()
    .subscribe((res)=>{
      this.myCourses = res      
    })
  }

  unList(courseId:string){
    this._courseService.unListCourse(courseId).subscribe((res)=>{
      this._toastr.success("course Unlisted");
      this.getMyAllCourses();
    })
  }

  list(courseId:string){
    this._courseService.listCourse(courseId).subscribe({
      next:(res)=>{
        this._toastr.success("Course Listed");
        this.getMyAllCourses();
      },
      error:(error)=>{
        this._toastr.error("course listing failed");
        console.log(error);
        
      }
    })
  }

}
