import {Component, OnChanges, OnInit} from '@angular/core';
import {CourseService} from 'src/app/back/features/services/course.service';
import {Course} from 'src/app/back/features/model/course';
import Swal from 'sweetalert2';
import {SharedDataService} from 'src/app/back/features/shared/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit, OnChanges {

  public editVisibility: any = false;
  public courses!: Course[]
  public selectedCourse!: Course;
  public addVisibility: any = false;

  constructor(private coursService$: CourseService,
              private sharedDataservice$: SharedDataService,
              public router: Router,) {
  }


  ngOnChanges() {

  }

  ngOnInit() {
    this.getAllCourses();
  }

  /**
   * get all courses
   * @returns all courses
   */
  public getAllCourses() {
    this.coursService$.getAll().subscribe((res: Course[]) => {
      this.courses = res;
      console.log('%clist-course.component.ts line:30 this.courses', 'color: #007acc;', this.courses);
    })
  }

  getItemSelected(item: any) {
    console.log('%clist-course.component.ts line:35 item', 'color: #007acc;', item);
    this.selectedCourse = item;
  }

  deleteItem(item: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: 'Confirmation swal',
      text: 'are u sure u want to delete the item ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'Yes'
      /************************************************************ Popup Result  */

    }).then((result) => {
      if (result.isConfirmed) {
        /***> If Confirmed  **/
        this.coursService$.delete(item.id).subscribe(
          (resp) => {
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

            this.getAllCourses();

          },
          (err) => {
            this.getAllCourses();
            console.log(err);
            //this.toastr.success('Error');
          }
        );
      }
    })
    this.getAllCourses();
  }

  edit(item: any) {
    this.sharedDataservice$.setCourse(item);
  }


}
