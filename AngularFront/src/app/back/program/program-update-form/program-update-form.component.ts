import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {InstitutionDTO} from "../../../model/program/InstitutionDTO";
import {FormBuilder, Validators} from "@angular/forms";
import {InstitutionService} from "../../../service/program/institution.service";
import {ProgramDTO} from "../../../model/program/ProgramDTO";
import {ProgramService} from "../../../service/program/program.service";

@Component({
  selector: 'app-program-update-form',
  templateUrl: './program-update-form.component.html',
  styleUrls: ['./program-update-form.component.css']
})
export class ProgramUpdateFormComponent implements OnChanges{
  programRequest: ProgramDTO = {};
  @Input() programToUpdate: ProgramDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  programForm = this.formBuilder.group({
    id: [this.programToUpdate.id, [Validators.required]],
    name: [this.programToUpdate.name, [Validators.required, Validators.maxLength(40)]],
    description: [this.programToUpdate.description, [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
    programType: [this.programToUpdate.programType,[Validators.required]],
  });

  constructor(
    private programService: ProgramService,
    private formBuilder: FormBuilder
  ) {
  }

  close() {
    this.updateForm.emit(false)
  }

  updateProgram() {
    if (this.programForm.valid) {
      this.programRequest = Object.assign(this.programRequest, this.programForm.value);
      console.log(this.programRequest);
      this.programService.updateProgram(this.programRequest)
        .subscribe(data => {
            console.log(data)
            this.successMessage.emit("Program Updated");
            this.errorMessage.emit("");
          },
          error => {
            console.log("Update program error :", error)
            this.successMessage.emit("");
            this.errorMessage.emit("an error has occurred");
          });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['programToUpdate'] && changes['programToUpdate'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.programForm.patchValue({
      id: this.programToUpdate.id || '',
      name: this.programToUpdate.name || '',
      description: this.programToUpdate.description || '',
      programType: this.programToUpdate.programType || ''
    });
  }
}
