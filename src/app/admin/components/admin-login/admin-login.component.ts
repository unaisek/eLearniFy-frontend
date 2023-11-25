import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvalidTokenError } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  hide = true;
  adminLoginForm!: FormGroup;
  inavlid :boolean = true;

  constructor(
    private _fb:FormBuilder,
    private _http: HttpClient,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminService: AdminService
    ) {}

  ngOnInit(): void {
    this.adminLoginForm = this._fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required, Validators.minLength(5)]]
    })
  }

  get emailControll(){
    return this.adminLoginForm.get('email')

  }

  get passwordControll() {
    return this.adminLoginForm.get('password')

  }
  adminLoginSubmit(){

    const user = this.adminLoginForm.getRawValue();
    if(!this.adminLoginForm){
      this.inavlid = false;
    } else {
      this._adminService.adminLogin(user)
      .subscribe((res)=>{
        localStorage.setItem("adminAuthToken",res.token);
        this._router.navigate(['/admin']);
        this._toastr.success("Admin logged successfully")
      },(err)=>{
        if(err.error.message){
          this._toastr.error(err.error.message)
        } else{
          this._toastr.error("Something went wrong")
        }
      })
    }


  }


}
