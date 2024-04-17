import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {


  public comment_id!: any;
  public comment!: Comment;
  // selected: any;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() idPost!: any;
  @Output() commentAdded: EventEmitter<any> = new EventEmitter();


  /**
   * @ignore
   */
  constructor(private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public service: CommentService,
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
      comment: [''],
      idUser: [''],
      idPost: [''],
      idPere: [''],
      date: [new Date()],
    });
    this.formGroup.patchValue({
      idPost: this.idPost,

    });

console.log('%csrc\app\features\comment\components\add-comment\add-comment.component.ts:56 this.idPost', 'color: #007acc;', this.idPost);
  console.log('%csrc\app\features\comment\components\add-comment\add-comment.component.ts:57 this.formGroup.value.idPost', 'color: #007acc;', this.formGroup.value.idPost);

}

  public add() {
    this.submitted = true;

    console.log('formGroup add : ', this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }

    console.log('%csrc\app\features\comment\components\add-comment\add-comment.component.ts:68 this.formGroup.value.idPost', 'color: #007acc;', this.idPost);

  

    this.service.add(this.formGroup.value, this.idPost).subscribe(
      (resp) => {
        console.log(resp);
        alert("Commentaire a été enregistré avec succées");
        this.commentAdded.emit();
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


