import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpComponent } from './auth/otp/otp.component';
// import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
 
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent},
  { path:'verify/:id', component:OtpComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'tutor', loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/user', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
