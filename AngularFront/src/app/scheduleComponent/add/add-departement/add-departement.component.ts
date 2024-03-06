import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../service/schedule/department.service";
import {Router} from "@angular/router";
import {Departement} from "../../../model/schedule/departement";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})

  export class AddDepartementComponent implements OnInit {
  departments: Departement[] = [];
  newDepartment: {} = {};
  showAddForm = false;
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();

  newDepartementFormGroup!: FormGroup ;

  constructor(private fb: FormBuilder,private dpService:DepartmentService,
              private router: Router) {}
  showAddDepartmentForm() {
    this.showAddForm = true;
  }
  onAddForm() {
    this.addForm.emit(true);
  }
  cancelAdd() {
    this.showAddForm = false;
    this.newDepartment = {};
  }
  handleSuccessMessage(message: string) {
    Swal.fire('Success', message, 'success');
  }

  handleErrorMessage(message: string) {
    Swal.fire('Error', message, 'error');
  }

    ngOnInit(): void {

      this.newDepartementFormGroup = this.fb.group({
        name: this.fb.control('', [Validators.required]),
        chefDepartment: this.fb.control('', [Validators.required]
        )
      });

    }

    handleAddDepartement() {
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




}
