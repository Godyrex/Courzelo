import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent {


  public comment_id!: any;
  public comment!: Comment;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;
  @Output() commentEdited: EventEmitter<any> = new EventEmitter();

  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    public service: CommentService,
    private cdr: ChangeDetectorRef,
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
      comment: [''],
      idUser: [''],
      idPost: [''],
      idPere: [''],
      date: [new Date()],
    });
console.log('%csrc\app\features\comment\components\edit-comment\edit-comment.component.ts:61 this.dataedit', 'color: #007acc;', this.data);
    this.formGroup.patchValue({

      id: this.data.id,
      comment: this.data.comment,
      idUser: this.data.idUser,
      idPost: this.data.idPost,
      idPere: this.data.idPere,
      date: this.data.date,

    });


  }

  ngOnChanges() {
    console.log('%cedit-comment.component.ts line:78 this.data', 'color: #007acc;', this.data);
    this.formGroup.patchValue({

      id: this.data.id,
      comment: this.data.comment,
      idUser: this.data.idUser,
      idPost: this.data.idPost,
      idPere: this.data.idPere,
      date: this.data.date,

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
        alert("Commentaire a été modifié avec succées");
        this.commentEdited.emit();
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
