import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { University } from '../../models/university';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent {

  public unversity_id!: any;
  public University!: University;
  // selected: any;
  public formGroup!: FormGroup;
  submitted = false;


  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    //public dialogRef: MatDialogRef<AddUniversityComponent>,
    public service: UniversityService,
  ) { }

  /**
   * @ignore
   */
  get formControl() {
    return this.formGroup.controls;
  }



  /**
 * @ignore
 */
  public closeDialog() {
    // this.dialogRef.close(false);
  }

  /**
 * @ignore
 */
  ngOnInit(): void {

    this.formGroup = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      location: ['', Validators.required],
      description: ['', Validators.required],
      website: [''],
    });


  }

  public add() {
    this.submitted = true;

    console.log('formGroup add : ', this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }

    this.service.add(this.formGroup.value).subscribe(
      (resp) => {
        console.log(resp);
        alert("Université a été enrigistré avec succées");
      },
      (err) => {
        console.log(err);
        alert(err.error);
      }
    );

  }


}
