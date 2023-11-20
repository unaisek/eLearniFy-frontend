import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';


const routes: Routes =[
  { path:'home', component:TutorHomeComponent},
  { path:'', redirectTo:'home', pathMatch:'full' }
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TutorRoutingModule { }
