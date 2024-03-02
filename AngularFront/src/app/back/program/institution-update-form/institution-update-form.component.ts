import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {InstitutionDTO} from "../../../model/program/InstitutionDTO";
import {InstitutionService} from "../../../service/program/institution.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-institution-update-form',
  templateUrl: './institution-update-form.component.html',
  styleUrls: ['./institution-update-form.component.css']
})
export class InstitutionUpdateFormComponent implements OnChanges{
  institutionRequest : InstitutionDTO = {};
  @Input() institutionToUpdate : InstitutionDTO={};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder
  ) {
  }
  institutionForm = this.formBuilder.group({
    id: [this.institutionToUpdate.id, [Validators.required]],
    name: [this.institutionToUpdate.name, [Validators.required, Validators.maxLength(40)]],
    location: [this.institutionToUpdate.location, [Validators.required,Validators.maxLength(80)]],
    description: [this.institutionToUpdate.description, [Validators.required,Validators.maxLength(200), Validators.minLength(10)]],
    website: [this.institutionToUpdate.website],
  });
  close(){
    this.updateForm.emit(false)
  }
  updateInstitution() {
    if (this.institutionForm.valid) {
      this.institutionRequest = Object.assign(this.institutionRequest, this.institutionForm.value);
      console.log(this.institutionRequest);
      this.institutionService.updateInstitution(this.institutionRequest)
        .subscribe(data => {
            console.log(data)
            this.successMessage.emit("Institution Updated");
            this.errorMessage.emit("");
          },
          error => {
            console.log("Update Institution error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institutionToUpdate'] && changes['institutionToUpdate'].currentValue) {
      this.initializeForm();
    }
  }
  private initializeForm(): void {
    this.institutionForm.patchValue({
      id: this.institutionToUpdate.id || '',
      name: this.institutionToUpdate.name || '',
      location: this.institutionToUpdate.location || '',
      description: this.institutionToUpdate.description || '',
      website: this.institutionToUpdate.website || ''
    });
  }
}
