import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit,OnDestroy{

  invalid: boolean = false;
  otpVerificationForm!: FormGroup;
  showResendButton = false;
  timer:number = 120;
  intervalId;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.otpVerificationForm =this._fb.group({
      otp:["",[Validators.required]]
    })

    this.startTimer();

  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  get otpControll(){
    return this.otpVerificationForm.get("otp");
  }

  startTimer(){
    this.showResendButton = false;
    this.timer = 120;
    this.intervalId = setInterval(()=>{
      this.timer --;
      if(this.timer === 0){
        this.showResendButton = true;
        this.clearTimer();
      }
    },1000)
  }

  clearTimer(){
    clearInterval(this.intervalId)
  }

  otpSubmit(){

    const otp = this.otpVerificationForm.get('otp').value

    
    const email = this._route.snapshot.paramMap.get('email');

    if(!this.otpVerificationForm.valid){
      this.invalid = true
    } else {
      this._authService.userVerification(email,otp)
      .subscribe({next:()=>{
        this._toastr.success("Your email verified successfully ");
        this._router.navigate(['/login'])
      },error:(err)=>{
        if(err.error.message){
          this._toastr.error(err.error.message);

        } else {
          this._toastr.error("Something went wrong")
        }
      }
    })

    }
    
  }
  resendOTP(){    
    const email = this._route.snapshot.paramMap.get('email');
    
    this._authService.resendOtp(email)
    .subscribe({next:(res)=>{
      this._toastr.success("Otp resended");
      this.startTimer();
    },error:(err)=>{
      this._toastr.error("something went wrong")
    }})
    
  }

}
