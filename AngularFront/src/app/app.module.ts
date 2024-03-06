import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { EditUniversityComponent } from './features/university/components/university/edit-university/edit-university.component';
import { ListUniversityComponent } from './features/university/components/university/list-university/list-university.component';
import { RegisterComponent } from './core/back/register/register.component';
import { FooterComponent } from './core/back/footer/footer.component';
import { HeaderComponent } from './core/back/header/header.component';
import { SidebarComponent } from './core/back/sidebar/sidebar.component';
import { AddUniversityComponent } from './features/university/components/add-university/add-university.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgramComponent } from './features/prog/components/program/program.component';
import { AddProgramComponent } from './features/prog/components/add-program/add-program.component';
import { EditProgramComponent } from './features/prog/components/edit-program/edit-program.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EdiPostComponent } from './features/post/components/edi-post/edi-post.component';
import { ListPostComponent } from './features/post/components/list-post/list-post.component';
import { ListCommentComponent } from './features/comment/components/list-comment/list-comment.component';
import { AddCommentComponent } from './features/comment/components/add-comment/add-comment.component';
import { EditCommentComponent } from './features/comment/components/edit-comment/edit-comment.component';
import { AddPostComponent } from './features/post/components/add-post/add-post.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ListUniversityComponent,
    EditUniversityComponent,
    AddUniversityComponent,
    ProgramComponent,
    AddProgramComponent,
    EditProgramComponent,
    EdiPostComponent,
    ListPostComponent,
    ListCommentComponent,
    AddCommentComponent,
    EditCommentComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient, Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
