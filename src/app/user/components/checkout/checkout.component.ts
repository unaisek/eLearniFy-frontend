import { Component, OnInit } from '@angular/core';
import { ICoupon } from '../../../models/ICoupon';
import { UserCourseService } from '../../services/user-course.service';
import { ToastrService } from 'ngx-toastr';
import { ICourse } from '../../../tutor/models/ICourse';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPaymentData, PaymentService } from '../../services/payment.service';
import { IWallet } from 'src/app/models/IWallet';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  applyedCouponId: string = '';
  selectedCoupon: ICoupon;
  availableCoupons: ICoupon[];
  courseData: ICourse;
  checkoutForm: FormGroup;
  coursePrice: number;
  totalPrice: number;
  discountAmount: number = 0;
  walletData :IWallet;

  constructor(
    private _userCourseService: UserCourseService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _paymentService:PaymentService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this._fb.group({
      email: [''],
      paymentMethod: ['', Validators.required],
    });
    this.getCourseDetails();
    this.getAvailableCoupons();
    this.getWalletData();
  }

  getCourseDetails() {
    const courseId = this._route.snapshot.paramMap.get('id');
    this._userCourseService.getCourseDetails(courseId).subscribe({
      next: (res) => {
        this.courseData = res;
        this.coursePrice = parseInt(this.courseData?.price);
        this.totalPrice = this.coursePrice;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getAvailableCoupons() {
    const userId = localStorage.getItem('user');
    this._userService.getAvailableCoupons(userId).subscribe({
      next: (res) => {
        this.availableCoupons = res;
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        console.log(error);
      },
    });
  }

  getWalletData(){
    const userId = localStorage.getItem('user');
    this._userService.getWalletData(userId).subscribe({
      next:(res)=>{
        this.walletData = res
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

  }

  applyCoupon(couponId: string) {
    this.selectedCoupon = this.availableCoupons.find(
      (coupon) => coupon._id == couponId
    );
    if (this.selectedCoupon) {
      const userId = localStorage.getItem('user')
      this._userService.applyCoupon(couponId,this.courseData._id,userId).subscribe({
        next:(res)=>{
          if(this.selectedCoupon.discountType == "fixed"){
            this.discountAmount = parseInt(this.selectedCoupon.discountAmount);
            this.totalPrice = this.coursePrice - this.discountAmount;
          }else {
            this.discountAmount = Math.floor((this.coursePrice * parseFloat(this.selectedCoupon.discountAmount)) / 100);
            this.totalPrice = this.coursePrice - this.discountAmount
          }
          this._toastr.success('Coupon applyed');
          this.applyedCouponId = couponId;

        },
        error:(error)=>{
          this.applyedCouponId = ''
          if (error instanceof HttpErrorResponse) {
            const errorMessage = error.error.errors[0].message;
            this._toastr.error(errorMessage, 'Error');
                     
          } else{
            this._toastr.error(error.error)
          }
        }
      })
    }
  }

  initiatePayment(courseId: string) {
    const token = localStorage.getItem('userAuthToken');

    if (!token) {
      this._router.navigate(['/login']);
    }
    const paymentData:IPaymentData = this.checkoutForm.getRawValue();
    
    this._paymentService.makePayment(courseId,this.applyedCouponId ,paymentData).subscribe({
      next:(data) => {
        if(typeof data == "string"){
          this._paymentService.initiateStripeCheckout(data);
        } else {
          this._router.navigate([
            '/user/payment-success',
            { queryParams: { couponId: this.applyedCouponId } },
          ]);
        }
      },
      error:(error) => {
        console.log('payment error:', error);
      }

    });
  }
}
