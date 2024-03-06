import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";

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
  institutionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    location: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    website: [''],
  });

  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder
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
            this.successMessage.emit("Institution Added");
            this.errorMessage.emit("");
          },
          error => {
            console.log("add Institution error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }

}
