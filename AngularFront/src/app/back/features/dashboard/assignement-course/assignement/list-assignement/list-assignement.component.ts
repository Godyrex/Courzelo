import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignement } from 'src/app/back/features/model/assignement';
import { Course } from 'src/app/back/features/model/course';
import { AssignementService } from 'src/app/back/features/services/assignement.service';
import { SharedDataService } from 'src/app/back/features/shared/shared-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-assignement',
  templateUrl: './list-assignement.component.html',
  styleUrls: ['./list-assignement.component.css']
})
export class ListAssignementComponent implements OnInit {

  @Input()coursesInput!:Course;
  public editVisibility:any=false;
  public assignements!:Assignement[]
  public selectedAssignement!:Assignement;
  public addVisibility:any=false;
  constructor(private assignementService$:AssignementService) { }


  ngOnChanges() {

  }

  ngOnInit() {
    console.log('%clist-course-content.component.ts line:27 this.coursesInput.id', 'color: #007acc;', this.coursesInput.id);
    this.getAssignementByCourse();
  }

  /**
   * get all courses
   * @returns all courses
   */
  public getAssignementByCourse()
  {
    this.assignementService$.getAssignementByCourse(this.coursesInput.id).subscribe((res:Assignement[])=>{
      this.assignements = res;

    })
  }

  getItemSelected(item:any){
    this.selectedAssignement=item;
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
      this.assignementService$.delete(item.id).subscribe(
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

          this.getAssignementByCourse();

        },
        (err) => {
          this.getAssignementByCourse();
          console.log(err);
          //this.toastr.success('Error');
        }
           );
      }
    })
    this.getAssignementByCourse();

  }


}

