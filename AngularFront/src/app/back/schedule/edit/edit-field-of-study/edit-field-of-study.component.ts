import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../../../model/schedule/departement";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {FieldOfstudyService} from "../../../../service/schedule/field-ofstudy.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-field-of-study',
  templateUrl: './edit-field-of-study.component.html',
  styleUrls: ['./edit-field-of-study.component.css']
})
export class EditFieldOfStudyComponent implements  OnChanges{
  editFieldFormGroup!: FormGroup;
  @Input() fieldToUpdate: FieldOfStudy = {id: "", name: "", numbrWeeks: 0, chefField: "",departmentID:''} ;
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fieldOfstudyService:FieldOfstudyService
  ) {}
  ngOnInit(): void {
    this.editFieldFormGroup = this.fb.group({
      name: [this.fieldToUpdate.name, [Validators.required, Validators.maxLength(40)]],
      chefField: [this.fieldToUpdate.chefField, [Validators.required, Validators.maxLength(80)]],
      numbrWeeks: [this.fieldToUpdate.numbrWeeks, [Validators.required, Validators.maxLength(40)]],
      department: [this.fieldToUpdate.departmentID, [Validators.required, Validators.maxLength(40)]],
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
  handleUpdateField() {
    if (this.editFieldFormGroup.valid) {
      const updatedField: FieldOfStudy = {
        ...this.fieldToUpdate,
        ...this.editFieldFormGroup.value
      };
      this.fieldOfstudyService.updateField(this.fieldToUpdate.id, updatedField).subscribe(() => {
        this.handleSuccessMessage('Field of study updated successfully');
      }, (error) => {
        this.handleErrorMessage('Failed to update the field');
        console.error('Update field error:', error);
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fieldToUpdate'] && changes['fieldToUpdate'].currentValue) {
      this.initializeForm();
    }
  }
  private initializeForm(): void {
    this.editFieldFormGroup.patchValue({
      name: this.fieldToUpdate.name,
      chefDepartment: this.fieldToUpdate.chefField,
      numbrWeeks:this.fieldToUpdate.numbrWeeks,

      //fieldOfStudies: this.departmentToUpdate.fieldOfStudies
    });
  }
}
