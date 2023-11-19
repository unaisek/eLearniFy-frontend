import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpComponent } from './auth/otp/otp.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent
  },
  { 
    path:'register', component:RegisterComponent
  },
  {
    path:'verify/:id', component:OtpComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }