import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./front/home/home.component";
import {DashboardComponent} from "./back/dashboard/dashboard.component";
import {RegisterComponent} from "./back/register/register.component";
import { AddDepartementComponent } from './scheduleComponent/add/add-departement/add-departement.component';
import {
  GestionDepartementComponent
} from "./scheduleComponent/gestion/gestion-departement/gestion-departement.component";
import {AddFieldOfStudyComponent} from "./scheduleComponent/add/add-field-of-study/add-field-of-study.component";
import {EditDepartementComponent} from "./scheduleComponent/edit/edit-departement/edit-departement.component";
import {TimeTableComponent} from "./scheduleComponent/time-table/time-table.component";
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
