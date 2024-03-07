import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {NonDisponibility} from "../../../../model/schedule/non-disponibility";
import {NonDisponibilityService} from "../../../../service/schedule/non-disponibility.service";

@Component({
  selector: 'app-edit-non-disponibility',
  templateUrl: './edit-non-disponibility.component.html',
  styleUrls: ['./edit-non-disponibility.component.css']
})
export class EditNonDisponibilityComponent implements OnChanges {
  editNDBFormGroup!: FormGroup;
  @Input() NDBToUpdate: NonDisponibility = {id: '', day: "", period: ''};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private nonDisponibilityService: NonDisponibilityService
  ) {
  }

  ngOnInit(): void {
    this.editNDBFormGroup = this.fb.group({
      day: [this.NDBToUpdate.day, [Validators.required, Validators.maxLength(40)]],
      period: [this.NDBToUpdate.period, [Validators.required, Validators.maxLength(80)]],
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

  handleUpdateNdb() {
    if (this.editNDBFormGroup.valid) {
      const updatedNDB: NonDisponibility = {
        ...this.NDBToUpdate,
        ...this.editNDBFormGroup.value
      };
      this.nonDisponibilityService.updateNdb(this.NDBToUpdate.id, updatedNDB).subscribe(() => {
        this.handleSuccessMessage('Non Disponibility updated successfully');
      }, (error) => {
        this.handleErrorMessage('Failed to update the Non Disponibility');
        console.error('Update Non Disponibility error:', error);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['NDBToUpdate'] && changes['NDBToUpdate'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.editNDBFormGroup.patchValue({
      name: this.NDBToUpdate.day,
      chefDepartment: this.NDBToUpdate.period,
      //fieldOfStudies: this.departmentToUpdate.fieldOfStudies
    });
  }
}
