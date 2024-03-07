import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";

import Swal from 'sweetalert2';
import {MatDialogRef} from "@angular/material/dialog";
import {Departement} from "../../../../model/schedule/departement";
import {DepartmentService} from "../../../../service/schedule/department.service";

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})

export class AddDepartementComponent implements OnInit {
  departments: Departement[] = [];
  @Output() departmentAdded: EventEmitter<Departement> = new EventEmitter<Departement>();
  newDepartementFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dpService: DepartmentService,
    private router: Router,
    public dialogRef: MatDialogRef<AddDepartementComponent>
  ) {
  }

  ngOnInit(): void {
    this.newDepartementFormGroup = this.fb.group({
      name: ['', Validators.required],
      chefDepartment: ['', Validators.required]
    });
  }

  handleAddDepartement() {
    if (this.newDepartementFormGroup.valid) {
      const newDepart: Departement = this.newDepartementFormGroup.value;
      this.dpService.saveDepartment(newDepart).subscribe({
        next: data => {
          this.departmentAdded.emit(newDepart);
          this.dialogRef.close();

        },
        error: err => {
          this.handleSuccessMessage('Department added successfully');
          console.error('Save department error:', err);
        }
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  /*  handleAddDepartement() {
      if (this.newDepartementFormGroup.valid) {
        const newDepart: Departement = Object.assign({}, this.newDepartementFormGroup.value);

        this.dpService.saveDepartment(newDepart).subscribe({
          next: data => {
            this.handleSuccessMessage('Department added successfully');
          },
          error: err => {
            this.handleErrorMessage('An error occurred while saving the department');
            console.error('Save department error:', err);
          }
        });
      } else {
        this.handleErrorMessage('Please fill in all fields of the form correctly');
      }
    }
*/
  handleSuccessMessage(message: string) {
    Swal.fire('Success', message, 'success');
  }

  handleErrorMessage(message: string) {
    Swal.fire('Error', message, 'error');
  }


}
