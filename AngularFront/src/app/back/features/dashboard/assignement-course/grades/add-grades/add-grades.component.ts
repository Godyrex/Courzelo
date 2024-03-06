import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exams } from 'src/app/back/features/model/exams';
import { GradesService } from 'src/app/back/features/services/grades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.css']
})
export class AddGradesComponent implements OnInit {

  @Input()exams!:Exams;
  @Output() added: EventEmitter<any> = new EventEmitter();
  public addForm!: FormGroup;

  constructor(private fb: FormBuilder, private gradeService$: GradesService) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      note:['',Validators.required],
      datePass:['',Validators.required],
      idExamen:['',Validators.required],
    });

    this.addForm.patchValue({
      idExamen:this.exams.id,
    });
  }
  ngOnChanges() {
    this.addForm = this.fb.group({
      note:['',Validators.required],
      datePass:['',Validators.required],
      idExamen:['',Validators.required],
    });

    this.addForm.patchValue({
      idExamen:this.exams.id,
    });
  }

  add() {
    if(this.addForm.invalid)
    {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: 'error!',
        text: 'error ! form invalide',
        icon: 'warning',
        background: '#F0604D'
      });
      return
    }
    this.gradeService$
      .add(this.addForm.value)
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
    this.added.emit(false);
  }
}


