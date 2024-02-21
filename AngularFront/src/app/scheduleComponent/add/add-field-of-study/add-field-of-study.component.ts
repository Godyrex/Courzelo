import { Component } from '@angular/core';
import {Departement} from "../../../model/schedule/departement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {FieldOfstudyService} from "../../../service/schedule/field-ofstudy.service";
import Swal from "sweetalert2";
import {FieldOfStudy} from "../../../model/schedule/field-of-study";

@Component({
  selector: 'app-add-field-of-study',
  templateUrl: './add-field-of-study.component.html',
  styleUrls: ['./add-field-of-study.component.css']
})
export class AddFieldOfStudyComponent {
  newFiliereFormGroup!: FormGroup;
  departements: Departement[] = [];
  constructor(
    private fb: FormBuilder,
    private filiereService: FieldOfstudyService,

    private router: Router
  ) {}



  handleAddFiliere() {
    if (this.newFiliereFormGroup.valid) {
      const newFiliere: FieldOfStudy  = this.newFiliereFormGroup.value;
      this.filiereService.saveFieldOfStudy(newFiliere).subscribe({
        next: () => {
          Swal.fire('Succès', 'Filière ajoutée avec succès', 'success');
          this.router.navigateByUrl('FieldOfStudy/add');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }

  }}

