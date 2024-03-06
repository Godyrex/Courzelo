import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { CourseContent } from 'src/app/back/features/model/course-content';
import { CourseContentService } from 'src/app/back/features/services/course-content.service';
import { Course } from 'src/app/back/features/model/course';

@Component({
  selector: 'app-list-course-content',
  templateUrl: './list-course-content.component.html',
  styleUrls: ['./list-course-content.component.css']
})
export class ListCourseContentComponent implements OnInit,OnChanges {

  @Input()coursesInput!:Course;
  public editVisibility:any=false;
  public courses!:CourseContent[]
  public selectedCourse!:CourseContent;
  public addVisibility:any=false;
  constructor(private coursService$:CourseContentService) { }


  ngOnChanges() {

  }

  ngOnInit() {
    console.log('%clist-course-content.component.ts line:27 this.coursesInput.id', 'color: #007acc;', this.coursesInput.id);
    this.getAllCourses();
  }

  /**
   * get all courses
   * @returns all courses
   */
  public getAllCourses()
  {
    this.coursService$.getByIdCourses(this.coursesInput.id).subscribe((res:CourseContent[])=>{
      this.courses = res;
      console.log('%clist-course.component.ts line:30 this.courses', 'color: #007acc;', this.courses);
    })
  }

  getItemSelected(item:any){
    console.log('%clist-course.component.ts line:35 item', 'color: #007acc;', item);
    this.selectedCourse=item;
  }

  deleteItem(item:any)
  {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: 'Confirmation swal',
      text:  'are u sure u want to delete the item ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'Yes'
      /************************************************************ Popup Result  */

    }).then((result) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
      console.log('%csrc\app\back\features\dashboard\assignement-course\courseContent\list-course-content\list-course-content.component.ts:65 item.id', 'color: #007acc;', item.id);
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


}
