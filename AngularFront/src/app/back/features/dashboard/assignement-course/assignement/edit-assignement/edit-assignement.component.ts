import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assignement } from 'src/app/back/features/model/assignement';
import { AssignementService } from 'src/app/back/features/services/assignement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-assignement',
  templateUrl: './edit-assignement.component.html',
  styleUrls: ['./edit-assignement.component.css']
})
export class EditAssignementComponent implements OnInit,OnChanges {
  @Input() assignementInput!: Assignement;
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(private fb: FormBuilder, private assignementService$: AssignementService) {
    console.log("teeeeeeeeeeeeeeest")
  }
  ngOnInit(): void {
    console.log('%cedit-assignement.component.ts:20 this.selectedAssignement', 'color: #007acc;', this.assignementInput);
    this.editForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      deadline: ['',],
      type: ['', Validators.required],
      coursId: [''],
    });
   /* this.editForm.patchValue({
      id: this.assignementInput.id,
      description:  this.assignementInput.description,
      deadline:  this.assignementInput.deadline,
      type:  this.assignementInput.type,
      coursId:  this.assignementInput.coursId,
    });*/
  }
  ngOnChanges() {
    console.log('%cedit-assignement.component.ts:20 this.selectedAssignement', 'color: #007acc;', this.assignementInput);
    this.editForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      deadline: ['',],
      type: ['', Validators.required],
      coursId: [this.assignementInput.coursId],
    });
    this.editForm.patchValue({
      id: this.assignementInput.id,
      description:  this.assignementInput.description,
      deadline:  this.assignementInput.deadline,
      type:  this.assignementInput.type,
      coursId:  this.assignementInput.coursId,
    });
  }

  edit() {
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );
    this.assignementService$
      .edit(this.assignementInput.id,this.editForm.value)
      .subscribe(() => {
        console.log(
          '%cedit-cours.component.ts line: added success',
          'color: #007acc;'
        );

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'updated',
          icon: 'success',
          background: '#d4edda'
        });
      });
    this.edited.emit(false);
  }
}
