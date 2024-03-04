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
import {InstitutionTableComponent} from "./back/program/institution/institution-table/institution-table.component";
import {UsersTableComponent} from "./back/user/users-table/users-table.component";
import {InstitutionPanelComponent} from "./back/program/institution/institution-panel/institution-panel.component";
import {RoleGuardService} from "./service/user/guard/role-guard.service";
import {ProgramTableComponent} from "./back/program/program-table/program-table.component";

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
    path: 'superAdmin',
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
        component: InstitutionTableComponent
      }
    ]
  },
  {
    path: 'organisation',
    component: AdminPanelComponent,
    children: [
      {
        path: 'institution',
        component: InstitutionPanelComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'ADMIN'
        },

      },
      {
        path: 'programs',
        component: ProgramTableComponent
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
