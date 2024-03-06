import { TypereclamationService } from './../../../service/reclamation/typereclamation.service';
import { reclamation } from './../../../model/reclamation/reclamation';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/service/reclamation/reclamation.service';
import Swal from 'sweetalert2';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  status = ["EN_COURS","EN_ATTENTE","ClOTURE"];
  type=["NOTE","ABSANCE","FINANACE"];
    reclamationForm: FormGroup = new FormGroup({});
  id: string ="";
  date!:Date;
//reclamation:reclamation ={} as reclamation;
  constructor(  public dialogRef: MatDialogRef<UpdateReclamationComponent>,
    private reclamationservice:ReclamationService,
    private router:Router,private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public reclamation: any
  ){
      this.id = reclamation.reclamation;
  }
  ngOnInit(): void {
    this.createForm();
    console.log(this.id);
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
        type: [''],
        dateCreation:[''],
        status: ['', Validators.required],
      });
    }
  
    onUpdate(){
      console.log(this.reclamationForm.value);
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
