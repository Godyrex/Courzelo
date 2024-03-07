import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from 'src/app/back/features/model/course';
import {AssignementService} from 'src/app/back/features/services/assignement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.css']
})
export class AddAssignementComponent implements OnInit {
  @Input() courseInput!: Course;
  @Output() added: EventEmitter<any> = new EventEmitter();
  public addForm!: FormGroup;

  constructor(private fb: FormBuilder, private assignementService$: AssignementService) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      type: ['', Validators.required],
      coursId: [''],
    });

    this.addForm.patchValue({
      coursId: this.courseInput.id,
    });
  }

  ngOnChanges() {

  }

  add() {
    if (this.addForm.invalid) {
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
    this.assignementService$
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
