import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./front/home/home.component";
import {RegisterComponent} from "./back/auth/register/register.component";
import {LoginComponent} from "./back/auth/login/login.component";
import {LogoutComponent} from "./back/auth/logout/logout.component";
import {ProfileComponent} from "./back/user/profile/profile.component";
import {VerifyComponent} from "./back/auth/verify/verify.component";
import {PanelComponent} from "./back/shared/panel/panel.component";
import {InstitutionTableComponent} from "./back/program/institution/institution-table/institution-table.component";
import {UsersTableComponent} from "./back/user/users-table/users-table.component";
import {InstitutionPanelComponent} from "./back/program/institution/institution-panel/institution-panel.component";
import {RoleGuardService} from "./service/user/guard/role-guard.service";
import {ProgramTableComponent} from "./back/program/program-table/program-table.component";
import {AuthGuardService} from "./service/user/guard/auth-guard.service";
import {DevicesListComponent} from "./back/user/devices-list/devices-list.component";
import {ForgotPasswordComponent} from "./back/auth/forgot-password/forgot-password.component";
import {RecoverPasswordComponent} from "./back/auth/recover-password/recover-password.component";

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
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'principleDashboard',
    loadChildren: () =>
      import('./back/features/dashboard/dashboard.module').then((m) => m.DashboardModule)
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
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'settings',
    component: PanelComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'devices',
        component: DevicesListComponent
      }
    ]
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'superAdmin',
    component: PanelComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'SUPERADMIN'
    },
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
    component: PanelComponent,
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
        component: ProgramTableComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'ADMIN'
        },
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
