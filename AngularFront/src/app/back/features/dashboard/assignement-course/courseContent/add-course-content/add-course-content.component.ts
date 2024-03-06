import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/back/features/model/course';
import { CourseContentService } from 'src/app/back/features/services/course-content.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.css']
})
export class AddCourseContentComponent implements OnInit, OnChanges {
  @Input()courseInput!:Course;
  @Output() added: EventEmitter<any> = new EventEmitter();
  public addForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService$: CourseContentService) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      description: ['', Validators.required],
      nom: ['', Validators.required],
      path: ['', Validators.required],
      coursId: [''],
    });

    this.addForm.patchValue({
      coursId:this.courseInput.id,
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
