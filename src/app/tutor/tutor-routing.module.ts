import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';
import { TutorLayoutComponent } from './components/tutor-layout/tutor-layout.component';
import { TutorDashboardComponent } from './components/tutor-dashboard/tutor-dashboard.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { tutorGuard } from '../core/guards/tutor.guard';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { TutorProfileComponent } from './shared/tutor-profile/tutor-profile.component';
import { TutorProfileViewComponent } from './components/tutor-profile-view/tutor-profile-view.component';


const routes: Routes =[
  { path:'',
   component: TutorLayoutComponent,canActivate:[tutorGuard],
   children:[
      { path:'', redirectTo:'/tutor/dashboard', pathMatch: 'full' },
      { path:'dashboard', component: TutorDashboardComponent },
      { path:'add-course', component: NewCourseComponent },
      { path:'view-course/:id',component:ViewCourseComponent },
      { path:'edit-course/:id',component:EditCourseComponent },
      { path:'profile', component:TutorProfileViewComponent }
   ] 
  }
]


 

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TutorRoutingModule { }
