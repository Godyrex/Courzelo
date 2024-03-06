import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourseComponent } from './cours/list-course/list-course.component';
import { ListAssignementComponent } from './assignement/list-assignement/list-assignement.component';
import { EditCoursComponent } from './cours/edit-cours/edit-cours.component';
import { ListExamsComponent } from './exams/list-exams/list-exams.component';
import { EditExamsComponent } from './exams/edit-exams/edit-exams.component';
import { EditAssignementComponent } from './assignement/edit-assignement/edit-assignement.component';

const routes: Routes = [
  {path: 'ListCourses',component: ListCourseComponent },
  {path: 'ListAssignement',component: ListAssignementComponent },
  {path:'editAssignement',component:EditAssignementComponent},
  {path: 'editCourses',component: EditCoursComponent },
  {path: 'listExams',component: ListExamsComponent },
  {path: 'editExams',component: EditExamsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignementCourseRoutingModule { }
