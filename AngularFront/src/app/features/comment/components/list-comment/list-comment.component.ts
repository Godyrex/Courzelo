import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { VoteService } from '../../services/vote.service';
import { Vote } from '../../models/vote';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css'],
  providers:[VoteService]
})
export class ListCommentComponent {

  public formGroup!: FormGroup;
  public formVote!: FormGroup;
  dataSource: Comment[] = [];
  selectedComment!:Comment;
  public commentId!: any;
  isDialogOpen!: boolean;
  isDialogEdit: boolean = false;
  public response:boolean = false;
   data!:any;
   @Input() comments: Comment[]=[];
   @Input() idPost!: any;
   likesCounts: { [idComment: string]: number } = {};
   dislikesCounts: { [idComment: string]: number } = {};

  /**
  * @ignore
  */
  constructor(private router: Router,
    public service: CommentService,
    private fb: FormBuilder,
    private voteService$:VoteService) {
  }

  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
      this.formGroup = this.fb.group({
      comment: [''],
      idUser: [''],
      idPost: [''],
      idPere: [''],
      date: [new Date()],
    });
    this.formVote = this.fb.group({
      idComment: [''],
      type: [''],
      idUser: [''],
    });
    this.getAll();

  }


  selectComment(comment:any)
  {
    this.selectedComment=comment;
    this.formGroup.patchValue({
      idPost: this.idPost,
      idUser:this.selectedComment.idUser,
      idPere:this.selectedComment.id,
    });
  }


  getAll() {

    this.service.getAll().subscribe((res: Comment[]) => {
      this.dataSource = res.map((item: Comment) => Comment.fromJson(item));
      this.dataSource.forEach((comment, index) => {
        console.log("comment.id",comment.id)
        this.getLikeVote(comment.id, index);
      });
      this.dataSource.forEach((comment, index) => {
        console.log("comment.id",comment.id)
        this.getDislikeVote(comment.id, index);
      });
    })
  }

  Add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
    console.log('%csrc\app\features\comment\components\list-comment\list-comment.component.ts:49 this.data', 'color: #007acc;', this.data);
  }


  Delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer ce commentaire",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.service.delete(id,this.idPost).subscribe(
          (resp: any) => {
           alert("Ce commentaire a été supprimé");

           this.getAll();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    })

  }

  OnSelected(id: any) {
    this.commentId = id;
  }

  onCommentEdited(): void {
    this.ngOnInit();
  }


  addResponse(){
    console.log('%csrc\app\features\comment\components\list-comment\list-comment.component.ts:122  this.formGroup.value', 'color: #007acc;',  this.formGroup.value);
    this.service.add(this.formGroup.value,this.idPost).subscribe((res)=>{
      console.log('%csrc\app\features\comment\components\list-comment\list-comment.component.ts:12 success', 'color: #007acc;');
      this.getAll();
    })

  }

  like(idComment:string){
    console.log("here "+idComment)
    this.formVote.patchValue({
      idComment: idComment,
      type: 1,
    })
    this.voteService$.add(this.formVote.value).subscribe((res)=>{
      console.log('%c vote like added', 'color: #007acc;');
      //alert("like");
    });
    this.getAll();

  }

  dislike(idComment:string){
    this.formVote.patchValue({
      idComment: idComment,
      type: 2,
    })
    this.voteService$.add(this.formVote.value).subscribe((res)=>{
      console.log('%c vote dislike added', 'color: #007acc;');
      //alert("dislike");
    });
    this.getAll();
  }

  getLikeVote(idComment: string, index: number): void {
    this.voteService$.getLikeVote(idComment).subscribe((res: number) => {
      console.log("getLikeVote ",res)
      this.likesCounts[idComment] = res;
    });
    console.log("this.likesCounts ",this.likesCounts)
  }

  getDislikeVote(idComment: string, index: number): void {
    this.voteService$.getDislikeVote(idComment).subscribe((res: number) => {
      console.log("getDislikeVote ",res)
      this.dislikesCounts[idComment] = res;
    });
    console.log("this.dislikesCounts ",this.dislikesCounts)
  }

}

