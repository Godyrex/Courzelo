import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipleDashboardComponent } from './principle-dashboard.component';

const routes: Routes = [
  {
    path: '', component: PrincipleDashboardComponent,



    children: [
      {
        path: 'assignemt',
        loadChildren: () => import('./assignement-course/assignement-course.module').then((m) => m.AssignementCourseModule),
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
