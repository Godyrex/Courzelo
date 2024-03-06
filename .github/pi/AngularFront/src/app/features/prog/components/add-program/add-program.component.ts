import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent {

  public prog_id!: any;
  public program!: Program;
  // selected: any;
  public formGroup!: FormGroup;
  submitted = false;

  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
   // public dialogRef: MatDialogRef<AddProgramComponent>,
    public service: ProgramService,
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
  ngOnInit(): void {
   
    this.formGroup = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      type: [''],
    });


  }

  public add() {
    this.submitted = true;

    console.log('formGroup add : ', this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }

    this.service.add(this.formGroup.value).subscribe(
      (resp:any) => {
        console.log(resp);
        alert("Programme a été enrigistré avec succées");      
  
      },
      (err:any) => {
        console.log(err);

        alert(err.error);
      }
    );

  }
 

}
