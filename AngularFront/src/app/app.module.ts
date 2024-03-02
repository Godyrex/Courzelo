import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './front/home/home.component';
import {HeaderComponent} from './back/header/header.component';
import {SidebarComponent} from './back/sidebar/sidebar.component';
import {FooterComponent} from './back/footer/footer.component';
import {DashboardComponent} from './back/dashboard/dashboard.component';
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
import {AdminPanelComponent} from './back/user/admin-panel/admin-panel.component';
import { InstitutionTableComponent } from './back/program/institution-table/institution-table.component';
import { UsersTableComponent } from './back/user/users-table/users-table.component';
import {RouterOutlet} from "@angular/router";
import { InstitutionAddFormComponent } from './back/program/institution-add-form/institution-add-form.component';
import { InstitutionUpdateFormComponent } from './back/program/institution-update-form/institution-update-form.component';
import { InstitutionAdminsTableComponent } from './back/program/institution-admins-table/institution-admins-table.component';
import { InstitutionAddAdminComponent } from './back/program/institution-add-admin/institution-add-admin.component';
import { InstitutionStudentsTableComponent } from './back/program/institution-students-table/institution-students-table.component';
import { InstitutionTeachersTableComponent } from './back/program/institution-teachers-table/institution-teachers-table.component';
import { InstitutionAddStudentComponent } from './back/program/institution-add-student/institution-add-student.component';
import { InstitutionAddTeacherComponent } from './back/program/institution-add-teacher/institution-add-teacher.component';
import { PaginationComponent } from './back/shared/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FrontheaderComponent,
    FrontfooterComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    VerifyComponent,
    AdminPanelComponent,
    InstitutionTableComponent,
    UsersTableComponent,
    InstitutionAddFormComponent,
    InstitutionUpdateFormComponent,
    InstitutionAdminsTableComponent,
    InstitutionAddAdminComponent,
    InstitutionStudentsTableComponent,
    InstitutionTeachersTableComponent,
    InstitutionAddStudentComponent,
    InstitutionAddTeacherComponent,
    PaginationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet
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
