import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClassDTO} from "../../../../model/program/ClassDTO";
import {ClassService} from "../../../../service/program/class.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-class-update',
  templateUrl: './class-update.component.html',
  styleUrls: ['./class-update.component.css']
})
export class ClassUpdateComponent implements OnChanges {
  classDTO: ClassDTO = {};
  @Input() classToUpdate: ClassDTO = {};
  @Output() successMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() classInfoChanged: EventEmitter<void> = new EventEmitter<void>();

  classForm = this.formBuilder.group({
    id: [this.classToUpdate.id, [Validators.required]],
    name: [this.classToUpdate.name, [Validators.required, Validators.maxLength(40)]],
    capacity: [this.classToUpdate.capacity, [Validators.required, Validators.min(10)]],
  });

  constructor(
    private classService: ClassService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService

  ) {
  }

  close() {
    this.updateForm.emit(false)
  }

  updateClass() {
    if (this.classForm.valid) {
      this.classDTO = Object.assign(this.classDTO, this.classForm.value);
      console.log(this.classDTO);
      this.classService.updateClass(this.classDTO)
        .subscribe(data => {
            console.log(data)
this.toaster.success("Class Updated");
            this.classInfoChanged.emit();
          },
          error => {
            console.log("Update Class error :", error)
this.toaster.error("an error has occurred")
            this.classInfoChanged.emit();
          });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['classToUpdate'] && changes['classToUpdate'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.classForm.patchValue({
      id: this.classToUpdate.id || '',
      name: this.classToUpdate.name || '',
      capacity: this.classToUpdate.capacity || 0,
    });
  }
}
