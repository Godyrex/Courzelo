import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClassService} from "../../../../service/program/class.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-class-add-user',
  templateUrl: './class-add-user.component.html',
  styleUrls: ['./class-add-user.component.css']
})
export class ClassAddUserComponent {
  @Input() classToUpdate: string = '';
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() role: string = '';
  @Output() userInfoChanged: EventEmitter<void> = new EventEmitter<void>();
  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private classService: ClassService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
  }

  close() {
    this.addForm.emit(false)
  }

  addUserToClass() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      console.log("class :" + this.classToUpdate);
      console.log("role :" + this.role);
      this.classService.addUserToClass(this.classToUpdate, this.role, this.emailForm.controls['email'].value!)
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
