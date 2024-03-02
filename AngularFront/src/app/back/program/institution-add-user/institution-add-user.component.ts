import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InstitutionService} from "../../../service/program/institution.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-institution-add-user',
  templateUrl: './institution-add-user.component.html',
  styleUrls: ['./institution-add-user.component.css']
})
export class InstitutionAddUserComponent {
  @Input() institutionToUpdate: string = '';
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() role: string = '';
  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder
  ) {
  }

  close() {
    this.addForm.emit(false)
  }

  addUserToInstitution() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.institutionService.addUserToInstitution(this.institutionToUpdate, this.role, this.emailForm.controls['email'].value!)
        .subscribe(data => {
            console.log(data)
            this.successMessage.emit(this.role + " Added");
            this.errorMessage.emit("");
          },
          error => {
            console.log("add " + this.role + " error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }
}
