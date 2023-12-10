import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';
import { TutorLayoutComponent } from './components/tutor-layout/tutor-layout.component';
import { TutorDashboardComponent } from './components/tutor-dashboard/tutor-dashboard.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { tutorGuard } from '../core/guards/tutor.guard';


const routes: Routes =[
  { path:'',
   component: TutorLayoutComponent,canActivate:[tutorGuard],
   children:[
      { path:'', redirectTo:'/tutor/home', pathMatch: 'full' },
      { path: 'home', component: TutorHomeComponent },
      { path:'dashboard', component: TutorDashboardComponent },
      { path:'add-course', component: NewCourseComponent }
   ]
  }
]


 

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TutorRoutingModule { }
