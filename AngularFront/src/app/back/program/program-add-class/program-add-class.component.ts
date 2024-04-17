import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProgramService} from "../../../service/program/program.service";
import {ClassDTO} from "../../../model/program/ClassDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-program-add-class',
  templateUrl: './program-add-class.component.html',
  styleUrls: ['./program-add-class.component.css']
})
export class ProgramAddClassComponent {
  @Input() programID: string = '';
  classRequest: ClassDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() classInfoChanged: EventEmitter<void> = new EventEmitter<void>();
  classForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    capacity: ['', [Validators.required, Validators.min(10)]],
  });

  constructor(
    private programService: ProgramService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService

  ) {
  }

  close() {
    this.addForm.emit(false)
  }

  addClassToProgram() {
    if (this.classForm.valid) {
      console.log(this.classForm.value);
      this.classRequest = Object.assign(this.classRequest, this.classForm.value);
      this.programService.addClassToProgram(this.programID, this.classRequest)
        .subscribe(data => {
            console.log(data)
this.toaster.success("Class Added");
            this.classInfoChanged.emit();
          },
          error => {
            console.log("add class error :", error)
this.toaster.error("an error has occurred")
          });
    }
  }
}
