import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {InstitutionService} from "../../../service/program/institution.service";
import {ProgramService} from "../../../service/program/program.service";
import {ClassDTO} from "../../../model/program/ClassDTO";

@Component({
  selector: 'app-program-add-class',
  templateUrl: './program-add-class.component.html',
  styleUrls: ['./program-add-class.component.css']
})
export class ProgramAddClassComponent {
  @Input() programID: string = '';
  classRequest : ClassDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  classForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    capacity: ['', [Validators.required, Validators.min(10)]],
  });

  constructor(
    private programService: ProgramService,
    private formBuilder: FormBuilder
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
            this.successMessage.emit( " Class Added");
            this.errorMessage.emit("");
          },
          error => {
            console.log("add class error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }
}
