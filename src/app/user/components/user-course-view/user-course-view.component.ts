import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCourseService } from '../../services/user-course.service';
import { ICourse } from 'src/app/tutor/models/ICourse';

@Component({
  selector: 'app-user-course-view',
  templateUrl: './user-course-view.component.html',
  styleUrls: ['./user-course-view.component.css']
})
export class UserCourseViewComponent  implements OnInit{

  courseData:ICourse

  constructor(
    private _route:ActivatedRoute,
    private _userCourseService: UserCourseService
  ){}

  ngOnInit(): void {
    this.getCourseDetails()
  }

  getCourseDetails(){
    const courseId = this._route.snapshot.paramMap.get('id');
    this._userCourseService.getCourseDetails(courseId).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.courseData = res;
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

  }
}
