import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true;
  loginForm!: FormGroup;
  jwt!: string |null;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(5)]]
    });

    this.jwt = localStorage.getItem('authToken');
  }
  
  get emailControll(){
    return this.loginForm.get('email')
  }

  get passwordControll(){
    return this.loginForm.get('password')
  }

  loginSubmit(){
    const user = this.loginForm.getRawValue();

    if(!this.loginForm.valid){
      this.invalid = true;
    }else {
      this.authService.userLogin(user)
      .subscribe((res)=>{
        localStorage.setItem('authToken',res.token);
        // localStorage.setItem('role',res.role);

        if(res.role =="student"){
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['tutor'])
        }        
      },(err)=>{
        if(err.error.message =="User not verified"){
          this.toastr.error("User not verified");
          this.authService.userReverification(user)
          .subscribe((res)=>{
            this.router.navigate(['/verify',(res as {_id:string})._id]);
            this.toastr.success("otp send to your email, please verify your email")
          },(err)=>{
            if(err.error.message){
              this.toastr.error(err.error.message);
            } else{
              this.toastr.error("Some thing went wrong")
            }
          })
        } else if(err.error.message){
          this.toastr.error(err.error.message)
        } else {
          this.toastr.error("Some thing went wrong")
        }
      })
    }
  }
  

}
