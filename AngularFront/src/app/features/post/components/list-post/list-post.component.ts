import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { User } from 'src/app/features/comment/models/user';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {


  dataSource: Post[] = [];
  public postId!: any;
   data!:any;
  /**
  * @ignore
  */
  constructor(
    public service: PostService) {
  }


  ngOnInit(): void {

    //this.getAll();
    this.getAllWithImage();

  }

 getAll() {

    this.service.getAll().subscribe((res: Post[]) => {
      this.dataSource = res.map((item: Post) => Post.fromJson(item));
    })

  }
  getAllWithImage() {
    this.service.getAll().subscribe((res: Post[]) => {
      this.dataSource = res.map((item: Post) => {
        // Assuming there's a property in your Post class that holds the base64 string of the image
        const imageUrl = this.getImageUrl(item.img); // Assuming the base64 image string is stored in a property called base64Image
        return { ...item, imageUrl }; // Add the imageUrl property to each post object
      });
      console.log("this.datasource",this.dataSource);
    });
  }
  getImageUrl(base64String: string): string {
    return 'data:image/jpg;base64,' + base64String;
  }

  openDialogedit(item: any) {
    this.data=item;
    console.log('%csrc\app\features\post\components\list-post\list-post.component.ts:41 item', 'color: #007acc;', item);
  }


  Delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.service.delete(id).subscribe(
          (resp: any) => {
            alert("Cette publication a été supprimée");

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
    /**
   * getUserByID
   */
    findUserNameById(userId: any): Observable<string> {
      return this.service.findUserById(userId).pipe(
        map((user: User) => user.name)
      );
    }
Add(){}
}

