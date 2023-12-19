import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {

  myCourses = []
  constructor(
    private _courseService:CourseService
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

}
