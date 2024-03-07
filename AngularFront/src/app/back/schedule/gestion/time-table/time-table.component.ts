import {Component} from '@angular/core';
import {Departement} from "../../../../model/schedule/departement";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import {Semester} from "../../../../model/schedule/semester";
import {ElementModule} from "../../../../model/schedule/element-module";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {ElementModuleService} from "../../../../service/schedule/element-module.service";
import {TimeTableService} from "../../../../service/schedule/time-table.service";

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent {
  prof!: boolean;

  public departements: Departement[] = [];
  public fields: FieldOfStudy[] = [];
  public semesters: Semester[] = [];
  public elementModule: ElementModule[] = [];
  ready: any;
  spinnerExport: any;


  constructor(private departmentService: DepartmentService, private TimeTableService: TimeTableService, private elementModuleService: ElementModuleService) {
  }

  ngOnInit() {

    this.getDepartements();

  }

  getDepartements() {
    this.departmentService.searchDepartments("")
      .subscribe(
        (data: Departement[]) => {
          this.departements = data;
        },
        (error) => {
          console.error('Error fetching departments:', error);
        }
      );
  }


}
