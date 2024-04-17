import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './features/post/components/list-post/list-post.component';
import {HomeComponent} from "./front/home/home.component";
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
import {RegisterComponent} from "./back/auth/register/register.component";
import {PanelComponent} from "./back/shared/panel/panel.component";
import {InstitutionPanelComponent} from "./back/program/institution/institution-panel/institution-panel.component";
import {RoleGuardService} from "./service/user/guard/role-guard.service";
import {ProgramTableComponent} from "./back/program/program-table/program-table.component";
import {InstitutionTableComponent} from "./back/program/institution/institution-table/institution-table.component";
import {UsersTableComponent} from "./back/user/users-table/users-table.component";
import {VerifyComponent} from "./back/auth/verify/verify.component";
import {DevicesListComponent} from "./back/user/devices-list/devices-list.component";
import {ProfileComponent} from "./back/user/profile/profile.component";
import {AuthGuardService} from "./service/user/guard/auth-guard.service";
import {RecoverPasswordComponent} from "./back/auth/recover-password/recover-password.component";
import {ForgotPasswordComponent} from "./back/auth/forgot-password/forgot-password.component";
import {LogoutComponent} from "./back/auth/logout/logout.component";
import {LoginComponent} from "./back/auth/login/login.component";
import {CalendarComponent} from "./back/program/institution/calendar/calendar.component";
import {ActionsComponent} from "./back/schedule/actions/actions.component";
import {MyProgramsAndClassesComponent} from "./back/program/my-programs-and-classes/my-programs-and-classes.component";
import {UsersSearchComponent} from "./back/user/users-search/users-search.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'actions',
    component: ActionsComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    },
  },
  {
    path: 'listPost',
    component: ListPostComponent
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
        component: UsersTableComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'SUPERADMIN'
        },
      },
      {
        path: 'search',
        component: UsersSearchComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'SUPERADMIN'
        },
      },
      {
        path: 'institutions',
        component: InstitutionTableComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'SUPERADMIN'
        },
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
          expectedRole: ['ADMIN','STUDENT','TEACHER']
        },
      },
      {
        path: 'ProgramsAndClasses',
        component: MyProgramsAndClassesComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: ['ADMIN','STUDENT','TEACHER']
        },
      },
      {
        path: 'calendar',
        component: CalendarComponent,
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
      },
      {
        path: 'departments',
        component: GestionDepartementComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: ['ADMIN']
        }
      },
      {
        path: 'timetable',
        component: TimeTableComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: ['ADMIN','TEACHER','STUDENT']
        },
      },
      {
        path: 'fieldOfStudies',
        component: GestionFieldOfStudyComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: ['ADMIN']
        }
      },
      {
        path: 'NonDisponibilities',
        component: NonDisponibilityComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: ['TEACHER','ADMIN']
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
