import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


import Swal from "sweetalert2";
import {FieldOfstudyService} from "../../../../service/schedule/field-ofstudy.service";
import {Departement} from "../../../../model/schedule/departement";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-add-field-of-study',
  templateUrl: './add-field-of-study.component.html',
  styleUrls: ['./add-field-of-study.component.css']
})
export class AddFieldOfStudyComponent implements OnInit {
  newfieldOfstudyFormGroup!: FormGroup;
  fields: FieldOfStudy[] = [];
  @Output() fieldAdded: EventEmitter<FieldOfStudy> = new EventEmitter<FieldOfStudy>();
  departments: Departement[] = [];

  constructor(
    private fb: FormBuilder,
    private fieldOfstudyService: FieldOfstudyService,
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<AddFieldOfStudyComponent>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.newfieldOfstudyFormGroup = this.fb.group({
      name: ['', Validators.required],
      numbrWeeks: ['', Validators.required],
      chefField: ['', Validators.required],
      departmentID: ['', Validators.required],


    });


    this.fetchDepartments();
  }


  /* handleAddFieldOfStudy() {
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
   }*/
  handleAddFieldOfStudy() {
    if (this.newfieldOfstudyFormGroup.valid) {
      const fieldOfStudy: FieldOfStudy = Object.assign({}, this.newfieldOfstudyFormGroup.value);
      const selectedDepartment = this.newfieldOfstudyFormGroup.get('departmentID')?.value;
      console.log('Selected department:', selectedDepartment);
      if (selectedDepartment !== null && selectedDepartment !== undefined) {
        fieldOfStudy.departmentID = selectedDepartment;
        console.log('Field of study:', fieldOfStudy);
        this.fieldOfstudyService.saveFieldOfStudy(fieldOfStudy).subscribe({
          next: data => {
            console.log(data);
            Swal.fire('Success', 'Field of study added successfully', 'success');
          },
          error: err => {
            console.error('Save field of study error:', err);
            Swal.fire('Error', 'An error occurred while saving the field of study', 'error');
          }
        });
      } else {
        console.error('Selected department ID is null or undefined.');
      }
    } else {
      Swal.fire('Error', 'Please fill in all fields of the form correctly', 'error');
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  private fetchDepartments() {
    this.departmentService.getAllDepartements().subscribe(
      (departments: Departement[]) => {
        this.departments = departments;
      },
      error => {
        console.error('Error fetching departments:', error);

      }
    );
  }

  handleSuccessMessage(message: string) {
    Swal.fire('Success', message, 'success');
  }

  handleErrorMessage(message: string) {
    Swal.fire('Error', message, 'error');
  }
}

