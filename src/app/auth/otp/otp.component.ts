import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private toastr: ToastrService,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.otpVerificationForm =this.fb.group({
      otp:["",[Validators.required]]
    })

  }

  get otpControll(){
    return this.otpVerificationForm.get("otp");
  }

  otpSubmit(){

    const otp = this.otpVerificationForm.get('otp').value
    console.log(otp,"otp");
    
    const id = this.route.snapshot.paramMap.get('id');

    if(!this.otpVerificationForm.valid){
      this.invalid = true
    } else {
      this.authService.userVerification(id,otp)
      .subscribe(()=>{
        this.toastr.success("Your email verified successfully ");
        this.router.navigate(['/login'])
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
