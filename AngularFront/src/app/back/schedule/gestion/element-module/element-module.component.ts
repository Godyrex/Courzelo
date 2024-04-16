import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementModuleService } from 'src/app/service/schedule/element-module.service';
import {ElementModule} from "../../../../model/schedule/element-module";
import {ClassService} from "../../../../service/program/class.service";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {SemesterService} from "../../../../service/schedule/semester.service";
import {ClassListDTO} from "../../../../model/program/ClassListDTO";
import {UserListDTO} from "../../../../model/user/UserListDTO";
import {TokenStorageService} from "../../../../service/user/auth/token-storage.service";
import {AuthenticationService} from "../../../../service/user/auth/authentication.service";
import {ModuleService} from "../../../../service/schedule/module.service";
import {Departement} from "../../../../model/schedule/departement";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import {Semester} from "../../../../model/schedule/semester";
import {Modul} from "../../../../model/schedule/Modul";
import {UserResponse} from "../../../../model/user/UserResponse";
import {Class} from "../../../../model/schedule/Class";

@Component({
  selector: 'app-element-module',
  templateUrl: './element-module.component.html',
  styleUrls: ['./element-module.component.css']
})
export class ElementModuleComponent implements OnInit {
  elements: ElementModule[] = [];
  classes: Class[] = [];
  departments: Departement[] = [];
  fields: FieldOfStudy[] = [];
  semesters: Semester[] = [];
  modules: Modul[] = [];
  teachers: UserResponse[] = [];
  elementModuleForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nmbrHours: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    dayOfWeek: new FormControl('', Validators.required),
    period: new FormControl('', Validators.required),
    classes: new FormControl('', Validators.required),
    semesters: new FormControl('', Validators.required),
    departments: new FormControl('', Validators.required),
    numSemesters: new FormControl('', Validators.required),
    numDepartments: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    modul: new FormControl('', Validators.required)
  });

  constructor(private elementModuleService: ElementModuleService,
            private classService:ClassService,
              private semesterService: SemesterService,
              private departmentService: DepartmentService,
              private tokenStorageService :TokenStorageService,
              private authenticationService: AuthenticationService,
              private moduleService: ModuleService,

) { }
  ngOnInit(): void {
    //this.fetchClasses();
    this.fetchSemesters();
    this.fetchDepartments();
    this.fetchTeachers();
    this.fetchModules();
  }

  fetchElements(): void {
    this.elementModuleService.getAllElementModules()
      .subscribe(elements => {
        this.elements = elements;
        console.log('Elements:', this.elements);
      });
  }
  /*fetchClasses(): void {
    this.classService.getClasses()
      .subscribe(classes => {
        this.classes = classes;
      });
  }*/

  fetchSemesters(): void {
    this.semesterService.getAllSemesters()
      .subscribe(semesters => {
        this.semesters = semesters;
      });
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartements()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  fetchTeachers(): void {
    this.authenticationService.getRole()
      .subscribe(role => {
        if (role.includes('Teacher')) {
          const userResponse = this.tokenStorageService.getUserResponse();
          if (userResponse) {
            this.teachers = [userResponse];
          }
        }
      });
  }
  fetchModules(): void {
    this.moduleService.getAllModules()
      .subscribe(modules => {
        this.modules = modules;
      });
  }
}
