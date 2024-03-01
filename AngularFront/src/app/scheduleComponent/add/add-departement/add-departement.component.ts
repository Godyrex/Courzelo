import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../service/schedule/department.service";
import {Router} from "@angular/router";
import {Departement} from "../../../model/schedule/departement";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})

  export class AddDepartementComponent implements OnInit {


  newDepartementFormGroup!: FormGroup ;
  constructor(private fb: FormBuilder,private dpService:DepartmentService,
              private router: Router) {}

    ngOnInit(): void {

      this.newDepartementFormGroup = this.fb.group({
        name: this.fb.control('', [Validators.required]),
        chefDepartment: this.fb.control('', [Validators.required]
        )
      });
    }
  handleAddDepartement() {
    if (this.newDepartementFormGroup.valid) {
      const newDepart: Departement = Object.assign({}, this.newDepartementFormGroup.value);

      this.dpService.saveDepartment(newDepart).subscribe({
        next: data => {
          console.log(data);
          Swal.fire('Success', 'Department added successfully', 'success');

        },
        error: err => {
          console.error('Save department error:', err);
          Swal.fire('Error', 'An error occurred while saving the department', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Please fill in all fields of the form correctly', 'error');
    }




}}
