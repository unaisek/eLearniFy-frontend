import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  signUpHide = true;
  signUpForm !:FormGroup;
  invalid: boolean = false;
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private authService:AuthService,
    private toastr:ToastrService
    ){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      role: ['',Validators.required],
      password:['',[Validators.required,this.validateStrongPassword]]
    })
  }

  validateStrongPassword(control:FormControl): ValidationErrors | null {
    const password = control.value
    const strongPasswordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(password && !strongPasswordRegex.test(password)){
      return { 'strongPassword': true }
    }

    return null
    
  }
  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email')
  }

  get role() {
    return this.signUpForm.get('role')
  }
  get password() {
    return this.signUpForm.get('password')
  }
 
  registerSubmit(){
    const user = this.signUpForm.getRawValue();
    console.log(user,"user");

    if(!this.signUpForm.valid){
      this.invalid = true;
    } else {
      this.authService.userRegister(user)
      .subscribe({next:(res)=>{
        this.router.navigate(['/verify',(res as {email:string}).email]);
       this.toastr.success("registerd")
        
      },error:(err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message)
        } else {
          this.toastr.error("Some thing went wrong")
        }
      }})
    }
    
  }


}


