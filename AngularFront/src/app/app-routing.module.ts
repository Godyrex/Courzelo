import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./front/home/home.component";
import {DashboardComponent} from "./back/dashboard/dashboard.component";
import {RegisterComponent} from "./back/register/register.component";
import {GestionDepartementComponent} from "./back/schedule/gestion/gestion-departement/gestion-departement.component";
import {AddDepartementComponent} from "./back/schedule/add/add-departement/add-departement.component";
import {EditDepartementComponent} from "./back/schedule/edit/edit-departement/edit-departement.component";
import {TimeTableComponent} from "./back/schedule/gestion/time-table/time-table.component";
import {AddFieldOfStudyComponent} from "./back/schedule/add/add-field-of-study/add-field-of-study.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'departments',
    component: GestionDepartementComponent,
    children: [
      { path: 'add', component: AddDepartementComponent },
      { path: 'edit', component: EditDepartementComponent }
    ]
  },
  {path:'departments',
  component:GestionDepartementComponent
  },
  {path:'timetable',
    component:TimeTableComponent
  },


  { path :'FieldOfStudy/add' ,
    component: AddFieldOfStudyComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
