import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InstitutionService} from "../../../service/program/institution.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-institution-add-admin',
  templateUrl: './institution-add-admin.component.html',
  styleUrls: ['./institution-add-admin.component.css']
})
export class InstitutionAddAdminComponent {
  @Input() institutionToUpdate : string= '';
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder
  ) {
  }
  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  close(){
    this.addForm.emit(false)
  }
  addAdmin() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.institutionService.addAdmin(this.institutionToUpdate,this.emailForm.controls['email'].value!)
        .subscribe(data => {
            console.log(data)
            this.successMessage.emit("Admin Added");
            this.errorMessage.emit("");
          },
          error => {
            console.log("add Admin error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }
}
