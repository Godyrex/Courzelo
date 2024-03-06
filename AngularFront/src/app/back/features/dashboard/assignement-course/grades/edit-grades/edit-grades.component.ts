import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grades } from 'src/app/back/features/model/grades';
import { GradesService } from 'src/app/back/features/services/grades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-grades',
  templateUrl: './edit-grades.component.html',
  styleUrls: ['./edit-grades.component.css']
})
export class EditGradesComponent implements OnInit {

  @Input()grades!:Grades
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(private fb: FormBuilder, private gradeService$: GradesService) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      id:[''],
      note:['',Validators.required],
      datePass:[''],
      idExamen:['',Validators.required],
    });

    this.editForm.patchValue({
      id:this.grades.id,
      note:this.grades.note,
      datePass:this.grades.datePass,
      idExamen:this.grades.idExamen
    });
  }

  ngOnChanges() {
    this.editForm.patchValue({
      id:this.grades.id,
      note:this.grades.note,
      datePass:this.grades.datePass,
      idExamen:this.grades.idExamen
    });
  }
  edit() {
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );
    this.gradeService$
      .edit(this.grades.id,this.editForm.value)
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
