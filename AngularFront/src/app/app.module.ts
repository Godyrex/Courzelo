import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './core/back/footer/footer.component';
import { HeaderComponent } from './core/back/header/header.component';
import { SidebarComponent } from './core/back/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
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
