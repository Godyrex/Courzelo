import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exams } from 'src/app/back/features/model/exams';
import { ExamsService } from 'src/app/back/features/services/exams.service';
import { SharedDataService } from 'src/app/back/features/shared/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-exams',
  templateUrl: './list-exams.component.html',
  styleUrls: ['./list-exams.component.css']
})
export class ListExamsComponent implements OnInit {

  public editVisibility:any=false;
  public exams!:Exams[]
  public selectedExams!:Exams;
  public addVisibility:any=false;
  constructor(private examService$:ExamsService,
    private sharedDataservice$:SharedDataService,
    public router:Router,) { }

  ngOnInit() {
    this.getAllExams();
  }


  /**
   * get all Examss
   * @returns all Examss
   */
  public getAllExams()
  {
    this.examService$.getAll().subscribe((res:Exams[])=>{
      this.exams = res;
      console.log('%clist-Exams.component.ts line:30 this.Examss', 'color: #007acc;', this.exams);
    })
  }

  getItemSelected(item:any){
    console.log('%clist-Exams.component.ts line:35 item', 'color: #007acc;', item);
    this.selectedExams=item;
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
      this.examService$.delete(item.id).subscribe(
        (resp) => {
          this.getAllExams();

        },
        (err) => {
          this.getAllExams();
          console.log(err);
          //this.toastr.success('Error');
        }
           );
      }
    })
    this.getAllExams();
  }

  edit(item:any)
  {
    this.sharedDataservice$.setExam(item);
  }

  onExamAdded(event: any) {
   this.getAllExams()
  }



}
