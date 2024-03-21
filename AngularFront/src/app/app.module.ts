import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './front/home/home.component';
import {HeaderComponent} from './back/header/header.component';
import {SidebarComponent} from './back/shared/sidebar/sidebar.component';
import {FooterComponent} from './back/footer/footer.component';
import {FrontheaderComponent} from './front/frontheader/frontheader.component';
import {FrontfooterComponent} from './front/frontfooter/frontfooter.component';
import {RegisterComponent} from './back/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './back/auth/login/login.component';
import {LogoutComponent} from './back/auth/logout/logout.component';
import {ProfileComponent} from './back/user/profile/profile.component';
import {Interceptor} from "./service/user/auth/Interceptor";
import {VerifyComponent} from './back/auth/verify/verify.component';
import {PanelComponent} from './back/shared/panel/panel.component';
import {InstitutionTableComponent} from './back/program/institution/institution-table/institution-table.component';
import {UsersTableComponent} from './back/user/users-table/users-table.component';
import {RouterOutlet} from "@angular/router";
import {
  InstitutionAddFormComponent
} from './back/program/institution/institution-add-form/institution-add-form.component';
import {
  InstitutionUpdateFormComponent
} from './back/program/institution/institution-update-form/institution-update-form.component';
import {PaginationComponent} from './back/shared/pagination/pagination.component';
import {InstitutionPanelComponent} from './back/program/institution/institution-panel/institution-panel.component';
import {
  InstitutionUsersTableComponent
} from './back/program/institution/institution-users-table/institution-users-table.component';
import {
  InstitutionAddUserComponent
} from './back/program/institution/institution-add-user/institution-add-user.component';
import {ProgramTableComponent} from './back/program/program-table/program-table.component';
import {ProgramAddFormComponent} from './back/program/program-add-form/program-add-form.component';
import {ProgramUpdateFormComponent} from './back/program/program-update-form/program-update-form.component';
import {ProgramClassesTableComponent} from './back/program/program-classes-table/program-classes-table.component';
import {ProgramAddClassComponent} from './back/program/program-add-class/program-add-class.component';
import {
  ProgramClassUsersTableComponent
} from './back/program/program-class-users-table/program-class-users-table.component';
import {ClassAddUserComponent} from './back/program/class/class-add-user/class-add-user.component';
import {ClassUpdateComponent} from './back/program/class/class-update/class-update.component';
import {UserProfileComponent} from './back/user/user-profile/user-profile.component';
import {DevicesListComponent} from './back/user/devices-list/devices-list.component';
import {ForgotPasswordComponent} from './back/auth/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from './back/auth/recover-password/recover-password.component';
import {AddFieldOfStudyComponent} from "./back/schedule/add/add-field-of-study/add-field-of-study.component";
import {EditDepartementComponent} from "./back/schedule/edit/edit-departement/edit-departement.component";
import {EditFieldOfStudyComponent} from "./back/schedule/edit/edit-field-of-study/edit-field-of-study.component";
import {GestionDepartementComponent} from "./back/schedule/gestion/gestion-departement/gestion-departement.component";
import {
  GestionFieldOfStudyComponent
} from "./back/schedule/gestion/gestion-field-of-study/gestion-field-of-study.component";
import {NonDisponibilityComponent} from "./back/schedule/gestion/non-disponibility/non-disponibility.component";
import {TimeTableComponent} from "./back/schedule/gestion/time-table/time-table.component";
import {AddDepartementComponent} from "./back/schedule/add/add-departement/add-departement.component";
import {AddNonDisponibilityComponent} from './back/schedule/add/add-non-disponibility/add-non-disponibility.component';
import {
  EditNonDisponibilityComponent
} from "./back/schedule/edit/edit-non-disponibility/edit-non-disponibility.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { CalendarComponent } from './back/program/institution/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FrontheaderComponent,
    FrontfooterComponent,
    RegisterComponent,
    AddDepartementComponent,
    AddFieldOfStudyComponent,
    EditDepartementComponent,
    EditNonDisponibilityComponent,
    EditFieldOfStudyComponent,
    GestionDepartementComponent,
    GestionFieldOfStudyComponent,
    NonDisponibilityComponent,
    TimeTableComponent,
    AddNonDisponibilityComponent,
    EditNonDisponibilityComponent,
    EditNonDisponibilityComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    VerifyComponent,
    PanelComponent,
    InstitutionTableComponent,
    UsersTableComponent,
    InstitutionAddFormComponent,
    InstitutionUpdateFormComponent,
    PaginationComponent,
    InstitutionPanelComponent,
    InstitutionUsersTableComponent,
    InstitutionAddUserComponent,
    InstitutionUsersTableComponent,
    InstitutionAddUserComponent,
    ProgramTableComponent,
    ProgramAddFormComponent,
    ProgramUpdateFormComponent,
    ProgramClassesTableComponent,
    ProgramAddClassComponent,
    ProgramClassUsersTableComponent,
    ClassAddUserComponent,
    ClassUpdateComponent,
    UserProfileComponent,
    DevicesListComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
