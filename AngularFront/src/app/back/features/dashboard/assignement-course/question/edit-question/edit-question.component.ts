import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from 'src/app/back/features/model/question';
import {QuestionService} from 'src/app/back/features/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit, OnChanges {

  @Input() question!: Question
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(private fb: FormBuilder, private questService$: QuestionService) {
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      sugg1: ['', Validators.required],
      sugg2: ['', Validators.required],
      sugg3: ['', Validators.required],
      wrSugg: ['', Validators.required],
      note: ['', Validators.required],
      idExamen: ['', Validators.required],
    });

    this.editForm.patchValue({
      id: this.question.id,
      description: this.question.description,
      sugg1: this.question.sugg1,
      sugg2: this.question.sugg2,
      sugg3: this.question.sugg3,
      wrSugg: this.question.wrSugg,
      note: this.question.note,
      idExamen: this.question.idExamen,
    });
  }

  ngOnChanges() {
    this.editForm.patchValue({
      id: this.question.id,
      description: this.question.description,
      sugg1: this.question.sugg1,
      sugg2: this.question.sugg2,
      sugg3: this.question.sugg3,
      wrSugg: this.question.wrSugg,
      note: this.question.note,
      idExamen: this.question.idExamen,
    });
  }

  edit() {
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );
    this.questService$
      .edit(this.question.id, this.editForm.value)
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
