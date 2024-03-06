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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   // HeaderComponent,
    //SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FrontheaderComponent,
    FrontfooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],

})
export class AppModule { }
