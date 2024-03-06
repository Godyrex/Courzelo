import { OnChanges } from '@angular/core';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnChanges {

  public prog_id!: any;
  public program!: Program;
  // selected: any;
  public formGroup!: FormGroup;
  submitted = false;

  @Input() data !: any;

  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    public service: ProgramService,
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
  ngOnInit(): void {

    console.log('%cedit-program.component.ts line:71 this.data', 'color: #007acc;', this.data);

    this.formGroup = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      type: [''],
    });



  }

  ngOnChanges() {
    this.formGroup.patchValue({

      id: this.data.id,
      name: this.data.name,
      description: this.data.description,
      type: this.data.website,

    });

  }

  public edit() {
    this.submitted = true;

    console.log('formGroup edit : ', this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }

    this.service.edit(this.formGroup.value).subscribe(
      (resp: any) => {
        console.log(resp);
        alert("Programme a été modifié avec succées");
        (this.location as any).reload();
      },
      (err: any) => {
        console.log(err);

        alert(err.error);
      }
    );

  }


}
