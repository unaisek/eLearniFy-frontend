import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from '../../services/user-course.service';
import { ICourse } from 'src/app/tutor/models/ICourse';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-course-view',
  templateUrl: './user-course-view.component.html',
  styleUrls: ['./user-course-view.component.css'],
})
export class UserCourseViewComponent implements OnInit {
  courseData: ICourse;
  paymentHandler: any = null;

  constructor(
    private _route: ActivatedRoute,
    private _userCourseService: UserCourseService,
    private _paymentService: PaymentService,
    private _router:Router,
    private _toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCourseDetails();
    // this.invokeStripe();
  }

  getCourseDetails() {
    const courseId = this._route.snapshot.paramMap.get('id');
    this._userCourseService.getCourseDetails(courseId).subscribe({
      next: (res) => {
        this.courseData = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // makePayment(amount:any){
  //   const paymentHandler = (<any> window).StripeCheckout.configure({
  //     key: this.stripeAPIKey,
  //     locale:'auto',
  //     token: ( stripeToken:any)=>{
  //       console.log(stripeToken);
  //       this.paymentStripe(stripeToken)
  //     },
  //   });
  //   paymentHandler.open({
  //     name:"eLearniFy",
  //     description:"Course purchase process",
  //     amount: amount * 100,
  //   });
  // }

  // paymentStripe(stripeToken:any){
  //   this._paymentService.makePayment(stripeToken).subscribe((data)=>{
  //     console.log(data);

  //   })
  // }

  // invokeStripe(){
  //   if(!window.document.getElementById('stripe-script')){
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = ()=>{
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: this.stripeAPIKey,
  //         locale:'auto',
  //         token: (stripeToken:any) =>{
  //           console.log(stripeToken);
  //           alert("payment has been successfull!")
  //         },
  //       });
  //     };
  //     window.document.body.appendChild(script)
  //   }
  // }

  freeEnroll(courseId:string){
    const token = localStorage.getItem('userAuthToken');
      if(!token){
        this._router.navigate(['/login'])
      }
    
    const userId = localStorage.getItem('user')
    this._userCourseService.enrollCourse(userId,courseId).subscribe({
      next:(res)=>{
        this._toastr.success("Course enrolled successfully!")
      },
      error:(error)=>{
        this._toastr.error("course enrollment failed..!");
        console.log(error.message);
        
      }
    })
  }

  initiatePayment(courseId: string) {
    const token = localStorage.getItem('userAuthToken');
    if (!token) {
       this._router.navigate(['/login']);
    }
    this._paymentService.makePayment(courseId).subscribe(
      (session)=>{
        this._paymentService.initiateStripeCheckout(session)
        // window.location.href = session
      },
      (error)=>{
        console.log("payment error:",error);
        
      }
    )
  }
}
