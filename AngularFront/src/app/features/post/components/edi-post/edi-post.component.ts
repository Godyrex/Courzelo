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
  public formGroupPhoto!:FormGroup;
  public selectedFiles: any;
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

    this.formGroupPhoto=this.fb.group({
      img:['',Validators.required],
    })

    this.formGroupPhoto.patchValue({
      img: this.data.img,
    });
  }

  ngOnChanges() {
    console.log('%cedit-post.component.ts line:78 this.data', 'color: #007acc;', this.data);
    this.formGroup.patchValue({
      id: this.data.id,
      description: this.data.description,
      userId: this.data.userId,
    });

    this.formGroupPhoto.patchValue({
      img: this.data.img,
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
    const inputPhoto = document.getElementById('img') as HTMLInputElement;
    const file = inputPhoto.files ? inputPhoto.files[0] : null; // Obtenez le premier fichier sélectionné

    console.log('%cadd-user.component.ts line:257 file', 'color: #007acc;', file);

    if (file) {
      this.service.addImagePost(this.data.id, file).subscribe(
        (res:any) => {
          // Traitez la réponse du serveur ici
          console.log('%cadd-user.component.ts line:253 success', 'color: #007acc;');
        },
        (err) => {
          // Traitez les erreurs ici
          console.log(err);
        }
      );
    } else {
      console.log('Aucun fichier sélectionné.');
    }
  }

  onSelectedFile(event:any) {
    this.selectedFiles = event.target.files;
  }

}
