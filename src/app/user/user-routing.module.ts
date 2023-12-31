import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { ProgressComponent } from './components/progress/progress.component';
import { UserCourseViewComponent } from './components/user-course-view/user-course-view.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { EnrolledCourseViewComponent } from './components/enrolled-course-view/enrolled-course-view.component';


const routes: Routes = [
  { path:'',
   component: UserLayoutComponent,
   children:[
      { path:'', redirectTo:'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path:'all-courses', component: AllCoursesComponent },
      { path:'progress', component: ProgressComponent },
      { path:'course-over-view/:id',component: UserCourseViewComponent},
      { path:'payment-success', component: PaymentSuccessComponent },
      { path:'profile', component: UserProfileComponent },
      { path: 'enrolled-course-overView/:id', component: EnrolledCourseViewComponent }
   ]
  }
  
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
