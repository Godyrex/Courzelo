import { Router } from '@angular/router';
import { TypereclamationService } from './../../../service/reclamation/typereclamation.service';
import { Component, OnInit } from '@angular/core';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-types',
  templateUrl: './list-types.component.html',
  styleUrls: ['./list-types.component.css']
})
export class ListTypesComponent implements OnInit {

  type: typereclamation[]= [];

constructor(private typeservice: TypereclamationService,
  private router: Router) { }
/*
  delete(id:any){
        this.typeservice.deleteType(id).subscribe(data =>{
          console.log(data);
            this.ngOnInit();
          });
        }*/
ngOnInit(): void {
  this.getType();
}

private getType(){
  this.typeservice.getTypeList().subscribe(data => {
    this.type = data;
    console.log(data);
  });
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
      this.typeservice.deleteType(id).subscribe((res:any) =>{
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
  }
  )
}


}