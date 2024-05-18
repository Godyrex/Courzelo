import { ReclamationtypeService } from './../../../../service/reclamation/reclamationtype.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import { TypereclamationService } from 'src/app/service/reclamation/typereclamation.service';
import { TrelloserviceService } from 'src/app/service/trello/trelloservice.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  data: FormGroup = new FormGroup({});


  TrelloData = new FormGroup({
    idBoard: new FormControl('',Validators.required),
    idListToDo: new FormControl('',Validators.required),
    idListDoing: new FormControl('',Validators.required),
    idListDone: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required)
  })
  constructor(

    private trelloService: TrelloserviceService,
    private formBuilder: FormBuilder,
    private typereclamationservice: TypereclamationService
  ) { }

    ngOnInit(): void {
      this.createForm();
    }
    createForm() {
      this.data = this.formBuilder.group({
        type: ['', Validators.required],
      });
    }

  add(){
    this.typereclamationservice.addType(this.data.value).toPromise().then((type:any)=>{
      if (type.id) {
        console.log("name board",type.type)
        this.trelloService.addBoard(type.type).subscribe((board:any)=>{
          console.log("Fault Here")
        /*  this.trelloService.getBoardList(board.id).subscribe((res: any) => {
            res.forEach((r: any) => {
              switch (r.name) {
                case "To Do":
                  this.TrelloData.patchValue({ idListToDo: r.id });
                  break;
                case "Doing":
                  this.TrelloData.patchValue({ idListDoing: r.id });
                  break;
                case "Done":
                  this.TrelloData.patchValue({ idListDone: r.id });
                  break;
                default:
                  break;
              }
            });
          });*/
          
          this.trelloService.getBoardList(board.id).subscribe((res: any) => {
            console.log("---->res",res)
            res.forEach((r: any) => {
              switch (r.name) {
                case "To Do":
                  this.TrelloData.patchValue({ idListToDo: r.id });
                  break;
                case "Doing":
                  this.TrelloData.patchValue({ idListDoing: r.id });
                  break;
                case "Done":
                  this.TrelloData.patchValue({ idListDone: r.id });
                  break;
                default:
                  break;
              }
            })
            this.TrelloData.patchValue({ idBoard: board.id })
            this.TrelloData.patchValue({ type: type.type })
            console.log(this.TrelloData.value)
            this.typereclamationservice.addTrello(this.TrelloData.value).toPromise().then((res: any) => {
              if (res.id) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success...',
                  text: 'Ajouté avec succès !',
                })
                this.data.reset();
               // this.OnClose();
              }
            })
          })
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Quelque chose s'est mal passé!",
        })
      }
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
      })
    })

    }

    /*OnClose(){
      this.dialogRef.close();
      
    }*/
    processList(listItem: any) {
      if (listItem.name === "To Do") {
        this.TrelloData.patchValue({ idListToDo: listItem.id });
      }
      // ... similar logic for Doing and Done lists
    }
}

