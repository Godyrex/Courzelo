import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {PrincipleDashboardComponent} from './principle-dashboard.component';
import {HeaderComponent} from '../../header/header.component';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {CourseService} from '../services/course.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseContentService} from '../services/course-content.service';
import {SharedDataService} from '../shared/shared-data.service';
import {QuestionService} from '../services/question.service';
import {ExamsService} from '../services/exams.service';
import {GradesService} from '../services/grades.service';
import {AssignementService} from '../services/assignement.service';

@NgModule({
  declarations: [
    PrincipleDashboardComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    CourseService,
    CourseContentService,
    SharedDataService,
    QuestionService,
    ExamsService,
    GradesService,
    AssignementService
  ],
})
export class DashboardModule {
}
