import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent {


  dataSource: Comment[] = [];
  public commentId!: any;
  isDialogOpen!: boolean;
  isDialogEdit: boolean = false;
   data!:any;
   @Input() comments: Comment[]=[];
   @Input() idPost!: any;

  /**
  * @ignore
  */
  constructor(private router: Router,
    public service: CommentService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {
  
    this.service.getAll().subscribe((res: Comment[]) => {
      this.dataSource = res.map((item: Comment) => Comment.fromJson(item));
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
            
           this.ngOnInit();
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

}

