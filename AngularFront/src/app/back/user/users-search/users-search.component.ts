import { Component } from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {FormBuilder, Validators} from "@angular/forms";
import {UpdateService} from "../../../service/user/profile/update.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent {
  Users: UserResponse[] = [];
  page = 0;
  constructor(
    private updateService: UpdateService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
  }
  searchForm = this.formBuilder.group({
    keyword: [''],
  });
  searchMoreUsers() {
    this.page++;
    this.updateService.searchUsers(this.searchForm.value.keyword!, this.page).subscribe(
      (response) => {
        this.Users = this.Users.concat(response);
        console.log(this.Users);
        },
      (error) => {
        this.toaster.error('Error while searching');
      }
    );

  }
  search() {
    this.page = 0;
    this.updateService.searchUsers(this.searchForm.value.keyword!, this.page).subscribe(
      (response) => {
        this.Users = response;
        console.log(this.Users);

      },
      (error) => {
        this.toaster.error('Error while searching');
      }
    );
  }
}
