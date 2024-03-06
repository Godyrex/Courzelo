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
import {EditFieldOfStudyComponent} from "./back/schedule/edit/edit-field-of-study/edit-field-of-study.component";
import {
  GestionFieldOfStudyComponent
} from "./back/schedule/gestion/gestion-field-of-study/gestion-field-of-study.component";
import {NonDisponibilityComponent} from "./back/schedule/gestion/non-disponibility/non-disponibility.component";
import {AddNonDisponibilityComponent} from "./add-non-disponibility/add-non-disponibility.component";
import {
  EditNonDisponibilityComponent
} from "./back/schedule/edit/edit-non-disponibility/edit-non-disponibility.component";

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


  {
    path: 'fieldOfStudies',
    component: GestionFieldOfStudyComponent,
    children: [
      { path: 'add', component: AddFieldOfStudyComponent },
      { path: 'edit', component: EditFieldOfStudyComponent }
    ]
  },
  {
    path: 'NonDisponibilities',
    component: NonDisponibilityComponent,
    children: [
      { path: 'add', component: AddNonDisponibilityComponent },
      { path: 'edit', component: EditNonDisponibilityComponent }
    ]
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
  declarations: [

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
