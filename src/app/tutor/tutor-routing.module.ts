import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';


const routes: Routes =[
  { path:'', redirectTo:'tutor-home', pathMatch:'full' },
  { path:'tutor-home', component:TutorHomeComponent},
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TutorRoutingModule { }
