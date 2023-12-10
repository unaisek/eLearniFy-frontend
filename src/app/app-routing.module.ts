import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpComponent } from './auth/otp/otp.component';
import { AuthGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
 
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path:'login', component:LoginComponent,canActivate:[AuthGuard]},
  { path:'register', component:RegisterComponent,canActivate:[AuthGuard]},
  { path:'verify/:email', component:OtpComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'tutor', loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
