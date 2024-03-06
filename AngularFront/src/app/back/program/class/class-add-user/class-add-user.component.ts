import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClassService} from "../../../../service/program/class.service";

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
  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private classService: ClassService,
    private formBuilder: FormBuilder
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
