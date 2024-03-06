import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {


  dataSource: Post[] = [];
  public postId!: any;
  isDialogOpen!: boolean;
  isDialogEdit: boolean = false;
   data!:any;
  /**
  * @ignore
  */
  constructor(
    public service: PostService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {

    this.service.getAll().subscribe((res: Post[]) => {
      this.dataSource = res.map((item: Post) => Post.fromJson(item));
    })

  }

  Add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
  }


  Delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      title: "",
      text: "Voulez vous supprimer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"

    }).then((result) => {
      if (result.isConfirmed) { 
        this.service.delete(id).subscribe(
          (resp: any) => {
            alert("Cette publication a été supprimée");

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

    this.postId = id;

  }


  onCommentAdded(): void {
    this.getAll();
  }

  onPostEdited(): void {
    this.ngOnInit();
  }

  onPostAdded(): void {
    this.ngOnInit();
  }

}