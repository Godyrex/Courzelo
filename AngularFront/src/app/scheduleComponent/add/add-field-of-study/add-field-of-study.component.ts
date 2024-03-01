import { Component } from '@angular/core';
import {Departement} from "../../../model/schedule/departement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {FieldOfstudyService} from "../../../service/schedule/field-ofstudy.service";
import Swal from "sweetalert2";
import {FieldOfStudy} from "../../../model/schedule/field-of-study";
import {DepartmentService} from "../../../service/schedule/department.service";

@Component({
  selector: 'app-add-field-of-study',
  templateUrl: './add-field-of-study.component.html',
  styleUrls: ['./add-field-of-study.component.css']
})
export class AddFieldOfStudyComponent {
  newfieldOfstudyFormGroup!: FormGroup;
  departments: Departement[] = [];
  constructor(
    private fb: FormBuilder,
    private fieldOfstudyService: FieldOfstudyService,
    private departmentService: DepartmentService,

    private router: Router
  ) {}
  ngOnInit(): void {
    this.newfieldOfstudyFormGroup = this.fb.group({
      name: [null, Validators.required],
      numbrWeeks: [null, Validators.required],
      chefField: [null, Validators.required],
      department: [null, Validators.required],

    });



    this.fetchDepartments();
  }



  handleAddFieldOfStudy() {
    if (this.newfieldOfstudyFormGroup.valid) {
      const fieldOfStudy: FieldOfStudy = Object.assign({}, this.newfieldOfstudyFormGroup.value);

      this.fieldOfstudyService.saveFieldOfStudy(fieldOfStudy).subscribe({
        next: data => {
          console.log(data);
          Swal.fire('Success', 'field of study added successfully', 'success');

        },
        error: err => {
          console.error('Save field of study error:', err);
          Swal.fire('Error', 'An error occurred while saving the field of study', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Please fill in all fields of the form correctly', 'error');
    }


  }

  private fetchDepartments() {
    this.departmentService.getAllDepartements().subscribe(
      (departments: Departement[]) => {
        this.departments = departments; // Assign fetched departments to the local variable
      },
      error => {
        console.error('Error fetching departments:', error);

      }

    );
  }
}

