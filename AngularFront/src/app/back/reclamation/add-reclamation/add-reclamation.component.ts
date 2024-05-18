import { TypereclamationService } from './../../../service/reclamation/typereclamation.service';
import { DialogModule } from 'primeng/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { reclamation } from 'src/app/model/reclamation/reclamation';
import { reclamationADD } from 'src/app/model/reclamation/reclamationadd';
import { ReclamationService } from 'src/app/service/reclamation/reclamation.service';
import { TokenStorageService } from 'src/app/service/user/auth/token-storage.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import { reclamationDTO } from 'src/app/model/reclamation/reclamationDTO';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit{
  reclamation!: reclamation;
  reclamationdto!:reclamationDTO;
  reclamationADD! : reclamationADD;
  types:String[]=[];
  type: typereclamation[] = [];  status = ["EN_COURS","EN_ATTENTE","ClOTURE"];
    reclamationForm: FormGroup = new FormGroup({});
    constructor(private reclamationservice: ReclamationService,private typeservice:TypereclamationService,
      private router: Router,  private formBuilder: FormBuilder,private typereclamation:TypereclamationService,
      private token: TokenStorageService,
    //  public dialogRef: MatDialogRef<AddReclamationComponent>,
      ){}
    ngOnInit(): void {
      this.createForm();
      this.reclamationForm.get('type')?.valueChanges.subscribe(selectedValue => {
        console.log('Selected value:', selectedValue);
      });
      this.typereclamation.getTypeList().subscribe((data: typereclamation[]) => {
          // Extracting 'type' property from each element and storing in an array
   this.types = data.map(item => item.type);
  console.log(this.types); // This will log the array of 'type' values
 // Assign the data (array of Typereclamation) to this.type
      });
    }
    createForm() {
      this.reclamationForm = this.formBuilder.group({
        sujet: ['', Validators.required],
        details: ['', Validators.required],
        type:['',Validators.required]
      });
    }
    
    reclamationtypeValue() {
      return this.reclamationForm.get('type')?.value;
    }
    onSubmit(){
          // Specify all control values, or just the ones you want to change
//this.reclamationADD.
this.reclamationForm.get('type')?.valueChanges.subscribe(selectedValue => {
  console.log('Selected value:', selectedValue);
});
        console.log(this.reclamationForm.value)
         console.log("-----------",  this.reclamationtypeValue())        
         this.reclamationservice.addReclamationv5(this.reclamationForm.value).subscribe((res) =>{  
          console.log("heere",res)
          if (res){
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Supprimé avec succès !',
            })
            this.ngOnInit();
          }
          else{
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: "Ajouter avec succes!",
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
   //      this.reclamationservice.forwardToEmployee(res.id,this.token.getUser())
          }

/*Submit(){
  this.reclamationForm.patchValue({ client: this.token.getUser() })

        console.log(this.reclamationForm.value);

}*/
/*
onSubmit(){
  console.log(this.reclamationForm.value);
  this.reclamationservice.addReclamation(this.reclamationForm.value).subscribe((res:any) =>{
    if (res){
      Swal.fire({
        icon: 'success',
        title: 'Success...',
        text: 'Ajouté avec succès !',
      })
      this.onClose();
    }
  }).catch((err:any)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Quelque chose s'est mal passé!",
    })
  })
}
*/
/*onClose(){
this.dialogRef.close();
}*/


}


