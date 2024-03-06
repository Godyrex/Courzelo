import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './core/back/register/register.component';
import { ListPostComponent } from './features/post/components/list-post/list-post.component';
import { ProgramComponent } from './features/prog/components/program/program.component';
import { ListUniversityComponent } from './features/university/components/university/list-university/list-university.component';

const routes: Routes = [

  {
    path: '',
    component: ListUniversityComponent, pathMatch: 'full'

  },
  {
    path: 'listUniversity',
    component: ListUniversityComponent
  },
  {
    path: 'listPost',
    component: ListPostComponent
  },
  {
    path: 'listProg',
    component: ProgramComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
