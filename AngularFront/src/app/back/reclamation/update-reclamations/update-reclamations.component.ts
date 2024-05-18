import { reclamation } from 'src/app/model/reclamation/reclamation';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/service/reclamation/reclamation.service';
import Swal from 'sweetalert2';
import { TypereclamationService } from 'src/app/service/reclamation/typereclamation.service';

@Component({
  selector: 'app-update-reclamations',
  templateUrl: './update-reclamations.component.html',
  styleUrls: ['./update-reclamations.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  status = ["EN_COURS","EN_ATTENTE","ClOTURE"];
reclamati!:reclamation;
  types:String[]=[];
    reclamationForm: FormGroup = new FormGroup({});
  id: string ="";
  date!:Date;
//reclamation:reclamation ={} as reclamation;
  constructor(  public dialogRef: MatDialogRef<UpdateReclamationComponent>,
    private reclamationservice:ReclamationService,
    private router:Router,private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public reclamation: any,private typereclamation:TypereclamationService
  ){
      this.id = reclamation.reclamation;
  }
  ngOnInit(): void {
    this.createForm();
    console.log(this.id);
    this.typereclamation.getTypeList().subscribe((data: typereclamation[]) => {
      // Extracting 'type' property from each element and storing in an array
this.types = data.map(item => item.type);
console.log(this.types); // This will log the array of 'type' values
// Assign the data (array of Typereclamation) to this.type
  });
    this.reclamationservice.getReclamationById(this.id).subscribe((res:any)=>{
      this.reclamationForm.setValue(res);
      console.log(res);
      this.date=res.dateCreation;
    })
  }

    createForm() {
      this.reclamationForm = this.formBuilder.group({
        id:[],
        sujet: ['', Validators.required],
        details: ['', Validators.required],
        type: ['',Validators.required],
        dateCreation:[''],
        status: ['', Validators.required],
      });
    }
  
    onUpdate(){
      console.log(this.reclamationForm.value);
      this.id = this.reclamationForm.value['id'];
      this.reclamationservice.updateReclamation1(this.reclamationForm.value).subscribe((res:any) =>{
        if (res){
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Mise à jour avec succès !',
          })
          this.onClose();
        }
      })
    }
    onClose(){
      this.dialogRef.close();
      
    }
}

