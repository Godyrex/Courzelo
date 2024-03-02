import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./front/home/home.component";
import {DashboardComponent} from "./back/dashboard/dashboard.component";
import {RegisterComponent} from "./back/auth/register/register.component";
import {LoginComponent} from "./back/auth/login/login.component";
import {LogoutComponent} from "./back/auth/logout/logout.component";
import {ProfileComponent} from "./back/user/profile/profile.component";
import {VerifyComponent} from "./back/auth/verify/verify.component";
import {AdminPanelComponent} from "./back/user/admin-panel/admin-panel.component";
import {RoleGuardService} from "./service/user/guard/role-guard.service";
import {InstitutionTableComponent} from "./back/program/institution-table/institution-table.component";
import {UsersTableComponent} from "./back/user/users-table/users-table.component";
import {InstitutionAddFormComponent} from "./back/program/institution-add-form/institution-add-form.component";

const routes: Routes = [
  {
    path: '',
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
   /* canActivate: [RoleGuardService],
    data: {
      expectedRole: 'SUPERADMIN'
    },*/
    children: [
      {
        path: 'users',
        component: UsersTableComponent
      },
      {
        path: 'institutions',
        component: InstitutionAddFormComponent,
        outlet : 'second'
      },
      {
        path: 'institutions',
        component: InstitutionTableComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
