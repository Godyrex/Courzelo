import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './front/home/home.component';
import { HeaderComponent } from './back/header/header.component';
import { SidebarComponent } from './back/sidebar/sidebar.component';
import { FooterComponent } from './back/footer/footer.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FrontheaderComponent } from './front/frontheader/frontheader.component';
import { FrontfooterComponent } from './front/frontfooter/frontfooter.component';
import { RegisterComponent } from './back/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
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
    AddDepartementComponent,
    AddFieldOfStudyComponent,
    EditDepartementComponent,

    EditFieldOfStudyComponent,
    GestionDepartementComponent,
    GestionFieldOfStudyComponent,
    NonDisponibilityComponent,
    TimeTableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
      MatDialogModule
    ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
