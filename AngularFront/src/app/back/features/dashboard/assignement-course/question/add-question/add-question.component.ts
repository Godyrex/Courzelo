import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Exams } from 'src/app/back/features/model/exams';
import { QuestionService } from 'src/app/back/features/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Input()exams!:Exams;
  @Output() added: EventEmitter<any> = new EventEmitter();
  public addForm!: FormGroup;

  constructor(private fb: FormBuilder, private questService$: QuestionService) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      description:['',Validators.required],
      sugg1:['',Validators.required],
      sugg2:['',Validators.required],
      sugg3:['',Validators.required],
      wrSugg:['',Validators.required],
      note:['',Validators.required],
      idExamen:['',Validators.required],
    });

    this.addForm.patchValue({
      idExamen:this.exams.id,
    });
  }
  ngOnChanges() {

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
    this.questService$
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
