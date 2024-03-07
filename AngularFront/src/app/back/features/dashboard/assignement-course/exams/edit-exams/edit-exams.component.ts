import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Exams} from 'src/app/back/features/model/exams';
import {ExamsService} from 'src/app/back/features/services/exams.service';
import {SharedDataService} from 'src/app/back/features/shared/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exams',
  templateUrl: './edit-exams.component.html',
  styleUrls: ['./edit-exams.component.css']
})
export class EditExamsComponent implements OnInit {
  public exams!: Exams;
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private examsService$: ExamsService,
    private sharedDataService$: SharedDataService) {
  }

  ngOnInit() {

    this.exams = this.sharedDataService$.getExam();
    this.editForm = this.fb.group({
      id: [''],
      titre: [this.exams.titre, Validators.required],
      date: [this.exams.date],
    });
    this.editForm.patchValue({
      id: this.exams.id,
      titre: this.exams.titre,
      date: this.exams.date
    });

  }

  edit() {
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );
    this.examsService$
      .edit(this.exams.id, this.editForm.value)
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
