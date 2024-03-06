import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./front/home/home.component";
import {DashboardComponent} from "./back/dashboard/dashboard.component";
import {RegisterComponent} from "./back/register/register.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/principleDashboard',
    pathMatch: 'full'
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
  {
    path: 'principleDashboard',
    loadChildren: () =>
      import('./back/features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
