import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Departement} from "../../../../model/schedule/departement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {NonDisponibility} from "../../../../model/schedule/non-disponibility";
import {NonDisponibilityService} from "../../../../service/schedule/non-disponibility.service";

@Component({
  selector: 'app-add-non-disponibility',
  templateUrl: './add-non-disponibility.component.html',
  styleUrls: ['./add-non-disponibility.component.css']
})
export class AddNonDisponibilityComponent implements OnInit {
  nonDisponibilities: NonDisponibility[] = [];
  @Output() NDBAdded: EventEmitter<NonDisponibility> = new EventEmitter<NonDisponibility>();
  newNDBFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nonDisponibilityService:NonDisponibilityService,
    private router: Router,
    public dialogRef: MatDialogRef<AddNonDisponibilityComponent>
  ) {}

  ngOnInit(): void {
    this.newNDBFormGroup = this.fb.group({

     day: ['', Validators.required],
      period:['', Validators.required]
    });
  }

  handleAddNDB() {
    if (this.newNDBFormGroup.valid) {
      const newNDB: NonDisponibility = this.newNDBFormGroup.value;
      this.nonDisponibilityService.saveNdb(newNDB).subscribe({
        next: data => {
          this.NDBAdded.emit(newNDB);
          this.dialogRef.close();

        },
        error: err => {
          this.handleSuccessMessage('Non Disponibility added successfully');
          console.error('Save Non Disponibility  error:', err);
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
