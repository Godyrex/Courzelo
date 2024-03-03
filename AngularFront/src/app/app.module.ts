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
import {InstitutionTableComponent} from './back/program/institution-table/institution-table.component';
import {UsersTableComponent} from './back/user/users-table/users-table.component';
import {RouterOutlet} from "@angular/router";
import {InstitutionAddFormComponent} from './back/program/institution-add-form/institution-add-form.component';
import {InstitutionUpdateFormComponent} from './back/program/institution-update-form/institution-update-form.component';
import {PaginationComponent} from './back/shared/pagination/pagination.component';
import {InstitutionPanelComponent} from './back/program/institution-panel/institution-panel.component';
import {InstitutionUsersTableComponent} from './back/program/institution-users-table/institution-users-table.component';
import {InstitutionAddUserComponent} from './back/program/institution-add-user/institution-add-user.component';
import { ProgramTableComponent } from './back/program/program-table/program-table.component';
import { ProgramAddFormComponent } from './back/program/program-add-form/program-add-form.component';
import { ProgramUpdateFormComponent } from './back/program/program-update-form/program-update-form.component';
import { ProgramClassesTableComponent } from './back/program/program-classes-table/program-classes-table.component';
import { ProgramAddClassComponent } from './back/program/program-add-class/program-add-class.component';
import { ProgramClassUsersTableComponent } from './back/program/program-class-users-table/program-class-users-table.component';
import { ClassAddUserComponent } from './back/program/class-add-user/class-add-user.component';

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
    PaginationComponent,
    InstitutionPanelComponent,
    InstitutionUsersTableComponent,
    InstitutionAddUserComponent,
    ProgramTableComponent,
    ProgramAddFormComponent,
    ProgramUpdateFormComponent,
    ProgramClassesTableComponent,
    ProgramAddClassComponent,
    ProgramClassUsersTableComponent,
    ClassAddUserComponent
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
