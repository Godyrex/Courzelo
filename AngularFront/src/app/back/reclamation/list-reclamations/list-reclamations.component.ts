import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { reclamation } from 'src/app/model/reclamation/reclamation';
import { ReclamationService } from 'src/app/service/reclamation/reclamation.service';
import { environment } from 'src/environment/environment';
import { UpdateReclamationComponent} from '../update-reclamations/update-reclamations.component';
import Swal from 'sweetalert2';
import { TrelloserviceService } from 'src/app/service/trello/trelloservice.service';
import { ForwardComponent } from '../forward/forward.component';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent implements OnInit{

  reclamation:reclamation []=[];
  re:any[]=[];
  types:any[]=[];
  rec!: reclamation;
  sujet="";
  idListDoing: string | null = null;
  ded:any[]=[];

  constructor(private reclamationservice: ReclamationService,private trelloservice: TrelloserviceService,
    private router: Router,public dialog: MatDialog) { }

    ngOnInit(): void {
      this.getReclamation();
      this.deletetrello();
    }

    private deletetrello(){
    this.trelloservice.getAllCardInListDone(environment.idListDone).subscribe((res:any)=>{
        res.array.forEach((t:any) => {
          console.log(t.id);
          this.reclamationservice.deleteReclamation(t.id);
        });
        console.log("trello",this.re);
      })
    }

    getRecByDetails(sujet:string,details:string){
      
    }
        
    private getReclamation(){
      this.reclamationservice.getReclamationList().subscribe((data)=>{
        data.forEach((t:any) => {
          console.log("type",t.type.type);
        //  console.log(t);
          this.types.push(t.type.type);
          this.trelloservice.getBoardByType(t.type.type).subscribe((rkes: any) => {
            this.idListDoing = rkes.idListDoing;
            console.log("Doing", this.idListDoing);
        });

        });
        this.reclamation=data;
        console.log("TypesSSSSSSSSSSSSS",this.types)
      console.log("data:",data);
      })
    }

    private deleteReclamation(){
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

    Affecter(id: any) {
      const dialogRef = this.dialog.open(ForwardComponent,{
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
