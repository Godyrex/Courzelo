import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignementCourseRoutingModule} from './assignement-course-routing.module';
import {ListAssignementComponent} from './assignement/list-assignement/list-assignement.component';
import {ListCourseComponent} from './cours/list-course/list-course.component';
import {EditCoursComponent} from './cours/edit-cours/edit-cours.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditAssignementComponent} from './assignement/edit-assignement/edit-assignement.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddCourseComponent} from './cours/add-course/add-course.component';
import {ListCourseContentComponent} from './courseContent/list-course-content/list-course-content.component';
import {AddCourseContentComponent} from './courseContent/add-course-content/add-course-content.component';
import {EditCourseContentComponent} from './courseContent/edit-course-content/edit-course-content.component';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ListExamsComponent} from './exams/list-exams/list-exams.component';
import {AddExamsComponent} from './exams/add-exams/add-exams.component';
import {EditExamsComponent} from './exams/edit-exams/edit-exams.component';
import {ListQuestionComponent} from './question/list-question/list-question.component';
import {AddQuestionComponent} from './question/add-question/add-question.component';
import {EditQuestionComponent} from './question/edit-question/edit-question.component';
import {ListGradesComponent} from './grades/list-grades/list-grades.component';
import {AddGradesComponent} from './grades/add-grades/add-grades.component';
import {EditGradesComponent} from './grades/edit-grades/edit-grades.component';
import {AddAssignementComponent} from './assignement/add-assignement/add-assignement.component';

@NgModule({
  declarations: [
    ListAssignementComponent,
    AddAssignementComponent,
    EditAssignementComponent,
    ListCourseComponent,
    EditCoursComponent,
    AddCourseComponent,
    ListCourseContentComponent,
    AddCourseContentComponent,
    EditCourseContentComponent,
    ListExamsComponent,
    AddExamsComponent,
    EditExamsComponent,
    ListQuestionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    ListGradesComponent,
    AddGradesComponent,
    EditGradesComponent
  ],
  imports: [
    CommonModule,
    AssignementCourseRoutingModule,
    MatDialogModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TabViewModule

  ]
})
export class AssignementCourseModule {
}
