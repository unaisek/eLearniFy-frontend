import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{

  invalid: boolean = false;
  otpVerificationForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.otpVerificationForm = new FormGroup({
      otp: new FormControl("",[Validators.required])
    })

  }

  get otp():FormControl{
    return this.otpVerificationForm.get("otp") as FormControl
  }

  otpSubmit(){

    const otp = this.otpVerificationForm.getRawValue();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(otp+"otp" +id+"id");

    if(!this.otpVerificationForm.valid){
      this.invalid = true
    } else {
      this.authService.userVerification(otp,id)
      .subscribe(()=>{
        this.toastr.success("Your email verified successfully ");
        this.router.navigate(['/'])
      },(err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message);

        } else {
          this.toastr.error("Something went wrong")
        }
      }
      )

    }
    
  }

}
