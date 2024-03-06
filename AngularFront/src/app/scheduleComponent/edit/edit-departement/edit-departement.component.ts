import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Departement} from "../../../model/schedule/departement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../service/schedule/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnChanges{
  editDepartFormGroup!: FormGroup;
  @Input() departmentToUpdate: Departement = { chefDepartment: '', fieldOfStudies: [], id: '', name: '' };
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dpService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.editDepartFormGroup = this.fb.group({
      name: [this.departmentToUpdate.name, [Validators.required, Validators.maxLength(40)]],
      chefDepartment: [this.departmentToUpdate.chefDepartment, [Validators.required, Validators.maxLength(80)]],
      // fieldOfStudies: [this.departmentToUpdate.fieldOfStudies, [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    });
  }

  close(): void {
    this.updateForm.emit(false);
  }

  handleSuccessMessage(message: string): void {
    Swal.fire('Success', message, 'success');
  }

  handleErrorMessage(message: string): void {
    Swal.fire('Error', message, 'error');
  }

  handleUpdateDepart(): void {
    if (this.editDepartFormGroup.valid) {
      const updatedDepart: Departement = {
        ...this.departmentToUpdate,
        ...this.editDepartFormGroup.value
      };
      this.dpService.updateDepartment(this.departmentToUpdate.id, updatedDepart).subscribe(
        () => {
          this.handleSuccessMessage('Department updated successfully');
          this.updateForm.emit(true);
        },
        (error) => {
          this.handleErrorMessage('Failed to update the department');
          console.error('Update department error:', error);
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentToUpdate'] && changes['departmentToUpdate'].currentValue) {
      this.initializeForm();
    }
  }
}
