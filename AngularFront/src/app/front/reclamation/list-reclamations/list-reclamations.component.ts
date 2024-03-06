import { ReclamationService } from './../../../service/reclamation/reclamation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reclamation } from 'src/app/model/reclamation/reclamation';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { UpdateReclamationComponent } from '../update-reclamation/update-reclamation.component';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent implements OnInit{
  reclamation:reclamation []=[];

  constructor(private reclamationservice: ReclamationService,
    private router: Router,public dialog: MatDialog) { }

    ngOnInit(): void {
      this.getReclamation();
    }

    private getReclamation(){
      this.reclamationservice.getReclamationList().subscribe(data=>{
        this.reclamation=data;
      console.log(data);
      })
    }

    update(id:any){
      const dialogRef = this.dialog.open(UpdateReclamationComponent,{
        width : "40%",
        height: "80%",
        data: { reclamation:id}
      });
      dialogRef.afterClosed().subscribe(res =>{
       this.ngOnInit();
      })   
    }

    delete(id:any){
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Voulez-vous vraiment supprimer cette appartment ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reclamationservice.deleteReclamation1(id).subscribe((res:any) =>{
            if (res.message){
              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Supprimé avec succès !',
              })
              this.ngOnInit();
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose s'est mal passé!",
              })
            }
          },
          err =>{
            Swal.fire({
              icon: 'warning',
              title: 'La suppression a échoué!...',
              text: err.error.message,
            })
          }
          )
        }
        this.ngOnInit();
      }
      )
    }

}
