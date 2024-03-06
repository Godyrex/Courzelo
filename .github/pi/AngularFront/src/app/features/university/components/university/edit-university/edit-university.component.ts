import { OnChanges } from '@angular/core';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { University } from '../../../models/university';
import { UniversityService } from '../../../services/university.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent implements OnChanges {

  public unversity_id!: any;
  public University!: University;
  // selected: any;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;

  /**
   * @ignore
   */
  constructor(
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    //public dialogRef: MatDialogRef<EditUniversityComponent>,
    public service: UniversityService,
    private location: Location,
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
    //this.dialogRef.close(false);
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

  ngOnChanges() {
    console.log('%cedit-university.component.ts line:78 this.data', 'color: #007acc;', this.data);
    this.formGroup.patchValue({

      id: this.data.id,
      name: this.data.name,
      location: this.data.location,
      description: this.data.description,
      website: this.data.website,

    });
  }

  public edit() {
    this.submitted = true;

    console.log('formGroup edit : ', this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }

    this.service.edit(this.formGroup.value).subscribe(
      (resp) => {
        console.log(resp);
       alert("Université a été modifié avec succées");     
       (this.location as any).reload();
      },
      (err) => {
        console.log(err);

        alert(err.error);       
      }
    );

  }


  

}
