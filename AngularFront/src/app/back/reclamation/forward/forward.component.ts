import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Etat } from 'src/app/model/Etat';
import { reclamation } from 'src/app/model/reclamation/reclamation';
import { MessageService } from 'src/app/service/reclamation/message.service';
import { ReclamationService } from 'src/app/service/reclamation/reclamation.service';
import { TrelloserviceService } from 'src/app/service/trello/trelloservice.service';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  date!:Date;
  reclamationForm: FormGroup = new FormGroup({});
  employees = [];
  employee = ["touatiahmed","ahmed_touati"];
  reclamations :any = [];
  type=["NOTE","ABSANCE","FINANACE"];
  data = new FormGroup({
    developper: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
    /*projet: new FormControl(''),
    client: new FormControl('')*/
  })
  status = ["EN_COURS","EN_ATTENTE","ClOTURE"];
  //status = 'EN_ATTENTE';
  id: string ="";
  sujet: string ="";
  details: string ="";
  typerec:string ="";
  rec!:reclamation;


  complain: any;
  constructor(private route: ActivatedRoute, private reclamationservice: ReclamationService,
    @Optional() public dialogRef: MatDialogRef<ForwardComponent>,
    private router: Router, private messageService: MessageService,
    private trelloService: TrelloserviceService ,private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public reclamation: any
    ) {
    this.id = reclamation.reclamation;
 
  }


  ngOnInit(): void {
    this.createForm();
    //const id = this.route.snapshot.params.id;
    this.reclamationservice.getReclamationById(this.id).subscribe(res=>{
      this.rec=res;
      this.sujet=this.rec.sujet;
      this.details=this.rec.details;
      this.typerec=this.rec.type.type;
      this.reclamationForm.setValue(res);
      this.trelloService.getBoardByType(this.typerec).subscribe((res:any)=>{
        console.log(res.idListDone)})
      console.log(res);
      
      console.log("type->>",this.typerec)
      console.log(this.sujet);
    })
    /*    this.reclamationservice.getReclamationById(this.id).subscribe(res => {
    //  this.userService.getEmployesBySpeciality(res.speciality).subscribe(res => {
      this.reclamationForm.setValue(res);
        this.reclamations = res;
        this.sujet=res.sujet;
        this.details=res.details;
        console.log(res);
//})
    });*/

  }

  createForm() {
    this.reclamationForm = this.formBuilder.group({
      id:[],
      sujet: [''],
      details: [''],
      type: [''],
      dateCreation:[''],
      status: [''],
    });
  }
  backward() {
    const idListToDo = environment.idListToDo;
    const idListDoing = environment.idListDoing;
    const idListDone = environment.idListDone;
    const id = this.data.value['developper'];
    const complaintId = this.id;
    const complaintName = this.sujet;
    const complaintDetails = this.details;
    const activity = String(this.data.value['activity']);

    var splitted = activity.split(".", activity.length);

console.log(idListToDo,id,complaintId,complaintName,complaintDetails,activity)

this.trelloService.getTrelloUserId(id).subscribe((card: any) => {
  console.log(card);
  console.log(card.id);
  //create a checkList in this card

})

  }

  middle() {
    const idListToDo = environment.idListToDo;
    const idListDoing = environment.idListDoing;
    const idListDone = environment.idListDone;
    const id = this.data.value['developper'];
    const complaintId = this.id;
    const complaintName = this.sujet;
    const complaintDetails = this.details;
    const activity = String(this.data.value['activity']);
    const cardid="66206417a18f17855233f408";
    const t="first doing , second , third";
    var splitted = activity.split(".", activity.length);

console.log(idListToDo,id,complaintId,complaintName,complaintDetails,activity)
splitted.forEach(t=>{
this.trelloService.addItemToCheckList(cardid,t).subscribe((res: any) => {
  console.log(res);})
  
  //create a checkList in this card
})}
  forward() {
    //const idListToDo = environment.idListToDo;
    const idListDoing = environment.idListDoing;
    const idListDone = environment.idListDone;
    const id = this.data.value['developper'];
    const complaintId = this.id;
    const complaintName = this.sujet;
    const complaintDetails = this.details;
    const activity = String(this.data.value['activity']);

    var splitted = activity.split(".", activity.length);

console.log(id,complaintId,complaintName,complaintDetails,activity)

this.trelloService.getBoardByType(this.typerec).subscribe((res:any)=>{
  console.log("idList Doing " ,res.idListDo)
  this.trelloService.createCard(res.idListToDo, this.sujet, this.details).subscribe((card: any) => {
    console.log(card);
    console.log("le card id",card.id);
    this.trelloService.addCheckList(card.id).subscribe((chekList:any)=>
    {
      console.log("le checklist id",chekList.id)
      splitted.forEach(t=>{
          this.trelloService.getTrelloUserId(id).subscribe((member:any)=>{
            console.log("le userid :",member.id)
            this.trelloService.addEmployeToCard(card.id,member.id).subscribe((res:any)=>{
         //     this.reclamationservice.forwardToEmployee(complaintId,)
         this.reclamationservice.updateStatus(complaintId, Etat.EN_COURS).subscribe((res:any) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Transférer avec succès!',
            })
           this.messageService.send('isAddedComplaint');
            this.data.reset();
            try {
              this.dialogRef.close();
            } catch (error) { }
  
          }
          else {
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Transférer avec succès!',
            })
          }
        })
            }
            )
          },err => {
            console.log('Trello username developper not found');
            //assign the developper to complaint
              //update status of complaint
              this.reclamationservice.updateStatus(complaintId, Etat.EN_COURS).subscribe((res:any) => {
                if (res) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Transférer avec succès!',
                  })
                  this.messageService.send('isAddedComplaint');
                  this.data.reset();
                  try {
                    this.dialogRef.close();
                  } catch (error) { }
  
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
                }
              })
          
          })
          
   })
    }
    )
    //create a checkList in this card
  
  })
})


  }
/*
  forward() {
    const idListToDo = environment.idListToDo;
    const idListDoing = environment.idListDoing;
    const idListDone = environment.idListDone;

    const id = this.data.value['developper'];
    const complaintId = this.complain.complaint.id;
    const complaintName = this.route.snapshot.params.complaintName;
    const activity = String(this.data.value['activity']);
    //const dueDate = this.data.value['date'];
    const description = this.complain.complaint.details;
    let date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    var splitted = activity.split(".", activity.length);
    //splitted.forEach(s =>{console.log(s)});


//    this.trelloService.getBoardByProjet(projetName).subscribe((res: any) => {
      //create a card in trello
      this.trelloService.addCard(idListToDo, this.complain.complaint.sujet, description).subscribe((card: any) => {
        console.log(card.id);
        //create a checkList in this card
        this.trelloService.addCheckList(card.id).subscribe((checkList: any) => {
          console.log(checkList.id)
          splitted.forEach(t => {
            //add item to the checkList
            this.trelloService.addItemToCheckList(checkList.id, t).subscribe((res: any) => {
              // get developper username
              this.userService.getStaff(id).subscribe(res => {
                console.log(res.username);
                // get id of developper in the trello
                this.trelloService.getTrelloUserId(res.username).subscribe((member: any) => {
                  console.log(member.id);
                  // assign the developper to the card in trello
                  this.trelloService.addEmployeToCard(card.id, member.id).subscribe((res: any) => {
                    //assign the developper to complaint
                    this.complaintService.forwardToEmployee(complaintId, id).subscribe(res => {
                      //update status of complaint
                      this.complaintService.updateStatus(complaintId, Etat.EN_COURS).subscribe((res) => {
                        if (res) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Success...',
                            text: 'Transférer avec succès!',
                          })
                          this.messageService.send('isAddedComplaint');
                          this.data.reset();
                          try {
                            this.dialogRef.close();
                          } catch (error) { }

                        }
                        else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Quelque chose s'est mal passé!",
                          })
                        }
                      })
                    })

                  })
                }, err => {
                  console.log('Trello username developper not found');
                  //assign the developper to complaint
                  this.complaintService.forwardToEmployee(complaintId, id).subscribe(res => {
                    //update status of complaint
                    this.complaintService.updateStatus(complaintId, Etat.EN_COURS).subscribe((res) => {
                      if (res) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Success...',
                          text: 'Transférer avec succès!',
                        })
                        this.messageService.send('isAddedComplaint');
                        this.data.reset();
                        try {
                          this.dialogRef.close();
                        } catch (error) { }

                      }
                      else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!',
                        })
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
//    })


  }*/



}
