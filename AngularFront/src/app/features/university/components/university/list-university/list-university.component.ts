import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { MatDialog, MAT_DIALOG_DATA, MatDialogContent, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { University } from '../../../models/university';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css']
})
export class ListUniversityComponent {

  dataSource: University[] = [];
  public univId!: any;
  isDialogOpen!: boolean;
  isDialogEdit: boolean = false;
   data!:any;
  /**
  * @ignore
  */
  constructor(
 //   public dialog: MatDialog,
    public service: UniversityService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {

    this.service.getAll().subscribe((res: University[]) => {
      console.log('%clist-university.component.ts line:43 this.dataSource', 'color: #007acc;', this.dataSource);
      this.dataSource = res.map((item: University) => University.fromJson(item));
    })

  }

  Add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
  }


  Delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.service.delete(id).subscribe(
          (resp: any) => {
           
            
            this.getAll();

          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    })

  }

  OnSelected(id: any) {

    this.univId = id;

  }


}
