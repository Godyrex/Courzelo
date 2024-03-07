import {Component, EventEmitter, OnChanges, OnInit, Output,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from 'src/app/back/features/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit, OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  public addForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService$: CourseService) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnChanges() {

  }

  get formControl() {
    return this.addForm.controls;
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
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.addForm.value
    );
    this.courseService$
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
