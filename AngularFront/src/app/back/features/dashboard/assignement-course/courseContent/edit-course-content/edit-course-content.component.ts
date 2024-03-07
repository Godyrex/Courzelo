import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseContent} from 'src/app/back/features/model/course-content';
import {CourseContentService} from 'src/app/back/features/services/course-content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course-content',
  templateUrl: './edit-course-content.component.html',
  styleUrls: ['./edit-course-content.component.css']
})
export class EditCourseContentComponent implements OnInit, OnChanges {
  @Input() courseContentInput!: CourseContent;
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService$: CourseContentService) {
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      nom: ['', Validators.required],
      path: ['', Validators.required],
      coursId: [''],
    });
  }

  ngOnChanges() {
    this.editForm.patchValue({
      id: this.courseContentInput.id,
      description: this.courseContentInput.description,
      nom: this.courseContentInput.nom,
      path: this.courseContentInput.path,
      coursId: this.courseContentInput.coursId,
    });
  }

  edit() {
    console.log(
      '%cedit-cours.component.ts line:32 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );
    this.courseService$
      .edit(this.courseContentInput.id, this.editForm.value)
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
