import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exams } from 'src/app/back/features/model/exams';
import { Grades } from 'src/app/back/features/model/grades';
import { GradesService } from 'src/app/back/features/services/grades.service';
import { SharedDataService } from 'src/app/back/features/shared/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-grades',
  templateUrl: './list-grades.component.html',
  styleUrls: ['./list-grades.component.css']
})
export class ListGradesComponent implements OnInit {

  @Input()exam!:Exams;
  public editVisibility:any=false;
  public grades!:Grades[]
  public selectedGrade!:Grades;
  public addVisibility:any=false;
  constructor(private gradesService$:GradesService,
    private sharedDataservice$:SharedDataService,
    public router:Router,) { }

  ngOnInit() {
    this.getAllGrades();
  }


  /**
   * get all Examss
   * @returns all Examss
   */
  public getAllGrades()
  {
    this.gradesService$.getbyExamId(this.exam.id).subscribe((res:Grades[])=>{
      this.grades = res;
      console.log('%clist-Exams.component.ts line:30 this.Examss', 'color: #007acc;', this.grades);
    })
  }

  getItemSelected(item:any){
    console.log('%clist-Exams.component.ts line:35 item', 'color: #007acc;', item);
    this.selectedGrade=item;
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
      this.gradesService$.delete(item.id).subscribe(
        (resp) => {
          this.getAllGrades();
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
        },
        (err) => {
          this.getAllGrades();
          console.log(err);
          //this.toastr.success('Error');

        }
           );
      }
    })
    this.getAllGrades();
  }




}
