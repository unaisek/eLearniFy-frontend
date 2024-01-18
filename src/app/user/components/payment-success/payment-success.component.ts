import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCourseService } from '../../services/user-course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _userCourseService: UserCourseService,
    private _toastr:ToastrService
  ){}

  ngOnInit(): void {

    this.handleSuccessPayment()
    
  }

  handleSuccessPayment(){
    const userId = localStorage.getItem('user');
    const courseId = this._route.snapshot.queryParamMap.get('courseId');
    const couponId = this._route.snapshot.queryParamMap.get('couponId')
    if(courseId){
      this._userCourseService.enrollCourse(userId,courseId,couponId).subscribe({
        next:(response)=>{
          this._toastr.success("Course enrolled successfully!")
        }
      })
    }
    
  }

}
