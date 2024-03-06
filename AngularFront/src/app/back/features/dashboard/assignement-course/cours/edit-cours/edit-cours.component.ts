import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/back/features/model/course';
import { Teacher } from 'src/app/back/features/model/teacher';
import { CourseService } from 'src/app/back/features/services/course.service';
import { SharedDataService } from 'src/app/back/features/shared/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css'],
})
export class EditCoursComponent implements OnInit, OnChanges {
  public courseInput!: Course;
  public teacherList!:Teacher[];
  @Output() edited: EventEmitter<any> = new EventEmitter();
  public editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService$: CourseService,
    private sharedDataService$: SharedDataService
  ) {}
  ngOnInit(): void {
    this.courseInput = this.sharedDataService$.getCourse();
    console.log(
      '%cedit-cours.component.ts line:32 this.courseInput',
      'color: #007acc;',
      this.courseInput
    );
    this.teacherList=this.courseInput.teacherList;
    this.editForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
    });
    this.editForm.patchValue({
      id: this.courseInput.id,
      description: this.courseInput.description,
    });
  }
  ngOnChanges() {}

  edit() {
    {
      Swal.fire({
        //Show Popup Confirmation

        /************************************************************ Popup Settings  */
        title: 'Confirmation swal',
        text: 'are u sure u want to edit the item ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NO',
        confirmButtonText: 'Yes',
        /************************************************************ Popup Result  */
      }).then((result) => {
        if (result.isConfirmed) {
          /***> If Confirmed  **/
          this.courseService$
            .edit(this.courseInput.id, this.editForm.value)
            .subscribe(() => {
              console.log(
                '%cedit-cours.component.ts line: updated success',
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
        }
      });
    }
  }


  showToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: 'Success!',
      text: 'updated',
      icon: 'success',
    });
  }
}
