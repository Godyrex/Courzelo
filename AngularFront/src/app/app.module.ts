import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

<<<<<<< Updated upstream
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
=======
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './front/home/home.component';
import {HeaderComponent} from './back/header/header.component';
import {SidebarComponent} from './back/shared/sidebar/sidebar.component';
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
import {PanelComponent} from './back/shared/panel/panel.component';
import {InstitutionTableComponent} from './back/program/institution/institution-table/institution-table.component';
import {UsersTableComponent} from './back/user/users-table/users-table.component';
import {RouterOutlet} from "@angular/router";
import {InstitutionAddFormComponent} from './back/program/institution/institution-add-form/institution-add-form.component';
import {InstitutionUpdateFormComponent} from './back/program/institution/institution-update-form/institution-update-form.component';
import {PaginationComponent} from './back/shared/pagination/pagination.component';
import {InstitutionPanelComponent} from './back/program/institution/institution-panel/institution-panel.component';
import {InstitutionUsersTableComponent} from './back/program/institution/institution-users-table/institution-users-table.component';
import {InstitutionAddUserComponent} from './back/program/institution/institution-add-user/institution-add-user.component';
import { ProgramTableComponent } from './back/program/program-table/program-table.component';
import { ProgramAddFormComponent } from './back/program/program-add-form/program-add-form.component';
import { ProgramUpdateFormComponent } from './back/program/program-update-form/program-update-form.component';
import { ProgramClassesTableComponent } from './back/program/program-classes-table/program-classes-table.component';
import { ProgramAddClassComponent } from './back/program/program-add-class/program-add-class.component';
import { ProgramClassUsersTableComponent } from './back/program/program-class-users-table/program-class-users-table.component';
import { ClassAddUserComponent } from './back/program/class/class-add-user/class-add-user.component';
import { ClassUpdateComponent } from './back/program/class/class-update/class-update.component';
import { UserProfileComponent } from './back/user/user-profile/user-profile.component';
import { DevicesListComponent } from './back/user/devices-list/devices-list.component';
import { AddReclamationComponent } from './front/reclamation/add-reclamation/add-reclamation.component';
import { ListReclamationsComponent } from './front/reclamation/list-reclamations/list-reclamations.component';
import { UpdateReclamationComponent } from './front/reclamation/update-reclamation/update-reclamation.component';
import { ListTypesComponent } from './front/typereclamation/list-types/list-types.component';
import { AddTypeComponent } from './front/typereclamation/add-type/add-type.component';
import { UpdateTComponent } from './front/typereclamation/update-t/update-t.component';
import { ListReclamationComponent } from './front/typereclamation/reclamation/list-reclamation/list-reclamation.component';
import { EditReclamationComponent } from './front/typereclamation/reclamation/edit-reclamation/edit-reclamation.component';

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
    PanelComponent,
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
    ClassAddUserComponent,
    ClassUpdateComponent,
    UserProfileComponent,
    DevicesListComponent,
    AddReclamationComponent,
    ListReclamationsComponent,
    UpdateReclamationComponent,
    ListTypesComponent,
    AddTypeComponent,
    UpdateTComponent,
    ListReclamationComponent,
    EditReclamationComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
