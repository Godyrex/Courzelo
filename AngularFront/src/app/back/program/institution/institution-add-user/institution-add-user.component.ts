import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  @Output() userInfoChanged: EventEmitter<void> = new EventEmitter<void>();
  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
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

  addUserToInstitution() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.institutionService.addUserToInstitution(this.institutionToUpdate, this.role, this.emailForm.controls['email'].value!)
        .subscribe(data => {
            console.log(data)
            this.toaster.success("User Added");
            this.userInfoChanged.emit();
          },
          error => {
            console.log("add " + this.role + " error :", error)
            this.toaster.error("an error has occurred")
          });
    }
  }
}
