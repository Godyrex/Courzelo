import { EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  public post_id!: any;
  public post!: Post;
  public formGroup!: FormGroup;
  submitted = false;
  @Output() postAdded: EventEmitter<any> = new EventEmitter();


  /**
   * @ignore
   */
  constructor(private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public service: PostService,
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
      userId: [''],
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
        alert("Publication a été enrigistré avec succées");
        this.postAdded.emit();
        // Déclencher la détection de changement pour mettre à jour la vue
        this.cdr.detectChanges();
      },
      (err) => {
        console.log(err);
        alert(err.error);
      }
    );

  }


}
