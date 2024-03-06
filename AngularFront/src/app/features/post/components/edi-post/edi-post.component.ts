import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edi-post',
  templateUrl: './edi-post.component.html',
  styleUrls: ['./edi-post.component.css']
})
export class EdiPostComponent {

  public post_id!: any;
  public post!: Post;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;
  @Output() postEdited: EventEmitter<any> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public service: PostService,
  ) { }

  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [],
      description: ['', [Validators.required]],
      userId: ['', Validators.required],
    });

    this.formGroup.patchValue({
      id: this.data.id,
      description: this.data.description,
      userId: this.data.userId,
    });
  }

  ngOnChanges() {
    console.log('%cedit-post.component.ts line:78 this.data', 'color: #007acc;', this.data);
    this.formGroup.patchValue({
      id: this.data.id,
      description: this.data.description,
      userId: this.data.userId,
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
        alert("Publication a été modifié avec succées");     
        this.postEdited.emit();
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
