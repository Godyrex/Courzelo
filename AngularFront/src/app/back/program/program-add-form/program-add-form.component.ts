import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProgramDTO} from "../../../model/program/ProgramDTO";
import {ProgramService} from "../../../service/program/program.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-program-add-form',
  templateUrl: './program-add-form.component.html',
  styleUrls: ['./program-add-form.component.css']
})
export class ProgramAddFormComponent {
  programRequest: ProgramDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() addForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() programInfoChanged: EventEmitter<void> = new EventEmitter<void>();
  programForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    description: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    programType: ['', [Validators.required]],
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

  addProgram() {
    if (this.programForm.valid) {
      this.programRequest = Object.assign(this.programRequest, this.programForm.value);
      console.log(this.programRequest);
      this.programService.addProgram(this.programRequest)
        .subscribe(data => {
            console.log(data)
            this.toaster.success("Program Added");
            this.programInfoChanged.emit();
          },
          error => {
            console.log("add Program error :", error)
this.toaster.error("an error has occurred")
          });
    }
  }

}
