import { TypereclamationService } from './../../../service/reclamation/typereclamation.service';
import { typereclamation } from './../../../model/reclamation/typereclamation';
import { ReclamationService } from './../../../service/reclamation/reclamation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { reclamation } from 'src/app/model/reclamation/reclamation';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit{
  reclamation!: reclamation;
  type:typereclamation[] = [];
  status = ["EN_COURS","EN_ATTENTE","ClOTURE"];
    reclamationForm: FormGroup = new FormGroup({});
    constructor(private reclamationservice: ReclamationService,private typeservice:TypereclamationService,
      private router: Router,  private formBuilder: FormBuilder,
      ){}
    ngOnInit(): void {
      this.createForm();
      this.typeservice.getTypeList().subscribe(res =>{
        this.type = res;
      });
    }
    createForm() {
      this.reclamationForm = this.formBuilder.group({
        sujet: ['', Validators.required],
        details: ['', Validators.required],
        type: [''],
        status: ['', Validators.required],
      });
    }
    
    onSubmit(){
        console.log(this.reclamationForm.value);
        this.reclamationservice.addReclamation(this.reclamationForm.value).subscribe(res =>{
          console.log(res)
          },error => {
      console.log("add Institution error :", error)
    });
}
}


