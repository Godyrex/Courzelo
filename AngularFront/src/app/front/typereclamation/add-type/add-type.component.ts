import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { typereclamation } from './../../../model/reclamation/typereclamation';
import { TypereclamationService } from './../../../service/reclamation/typereclamation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
 type!: typereclamation;
    TypeForm: FormGroup = new FormGroup({});
    constructor(private typeservice: TypereclamationService,
      private router: Router,  private formBuilder: FormBuilder,
      ){}
    ngOnInit(): void {
      this.createForm();
    }
    createForm() {
      this.TypeForm = this.formBuilder.group({
        type: ['', Validators.required],  
      });
    }
    
    onSubmit(){
        console.log(this.TypeForm.value);
        this.typeservice.addType(this.TypeForm.value).subscribe(res =>{
          console.log(res)
          },error => {
      console.log("add Institution error :", error)
    });
}
}

  
 
  