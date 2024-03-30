import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-institution-add-form',
  templateUrl: './institution-add-form.component.html',
  styleUrls: ['./institution-add-form.component.css']
})
export class InstitutionAddFormComponent {
  institutionRequest: InstitutionDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() institutionInfoChanged: EventEmitter<void> = new EventEmitter<void>();
  institutionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    location: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    website: [''],
  });

  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
  }

  close() {
    this.addForm.emit(false)
  }

  addInstitution() {
    if (this.institutionForm.valid) {
      this.institutionRequest = Object.assign(this.institutionRequest, this.institutionForm.value);
      console.log(this.institutionRequest);
      this.institutionService.addInstitution(this.institutionRequest)
        .subscribe(data => {
            console.log(data)
            this.toaster.success("Institution Added");
            this.institutionInfoChanged.emit();
          },
          error => {
            console.log("add Institution error :", error)
            this.toaster.error("an error has occurred")
          });
    }
  }

}
