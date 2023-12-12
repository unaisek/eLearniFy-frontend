import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _courseService:CourseService
  ){

  }

  ngOnInit(): void {
    this.getCourseDetails()
  }

  getCourseDetails(){
    const courseId = this._route.snapshot.paramMap.get('id');
    this._courseService.getCourseDetails(courseId).
    subscribe((res)=>{
      console.log(res,"res");
      
    })
  }

}
