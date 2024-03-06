import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

  dataSource: Program[] = [];
  public progId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!:any;
    /**
  * @ignore
  */
  constructor(
   // public dialog: MatDialog,
    public service: ProgramService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {

    this.service.getAll().subscribe((res: Program[]) => {
      console.log('%clist-university.component.ts line:43 this.dataSource', 'color: #007acc;', this.dataSource);
      this.dataSource = res.map((item: Program) => Program.fromJson(item));
    })

  }


  Add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
    console.log('%cprogram.component.ts line:74 this.data', 'color: #007acc;', this.data);
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

    }).then((result: any) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.service.delete(id).subscribe(
          (resp: any) => {
            console.log(resp);
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

    this.progId = id;

  }


}
