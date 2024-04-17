import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {Departement} from "../../../../model/schedule/departement";

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnChanges {
  editDepartFormGroup!: FormGroup;
  @Input() departmentToUpdate: Departement = {chefDepartment: "", fieldOfStudies: [], id: "", name: ""};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dpService: DepartmentService
  ) {
  }

  ngOnInit(): void {
    this.editDepartFormGroup = this.fb.group({
      name: [this.departmentToUpdate.name, [Validators.required, Validators.maxLength(40)]],
      chefDepartment: [this.departmentToUpdate.chefDepartment, [Validators.required, Validators.maxLength(80)]],
      // fieldOfStudies: [this.departmentToUpdate.fieldOfStudies, [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    });
  }

  close() {
    this.updateForm.emit(false);
  }

  handleSuccessMessage(message: string) {
    Swal.fire('Success', message, 'success');
  }

  handleErrorMessage(message: string) {
    Swal.fire('Error', message, 'error');
  }

  handleUpdateDepart() {
    if (this.editDepartFormGroup.valid) {
      const updatedDepart: Departement = {
        ...this.departmentToUpdate,
        ...this.editDepartFormGroup.value
      };
      this.dpService.updateDepartment(this.departmentToUpdate.id, updatedDepart).subscribe(() => {
        this.handleSuccessMessage('Department updated successfully');
      }, (error) => {
        this.handleErrorMessage('Failed to update the department');
        console.error('Update department error:', error);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentToUpdate'] && changes['departmentToUpdate'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.editDepartFormGroup.patchValue({
      name: this.departmentToUpdate.name,
      chefDepartment: this.departmentToUpdate.chefDepartment,
      //fieldOfStudies: this.departmentToUpdate.fieldOfStudies
    });
  }

}
