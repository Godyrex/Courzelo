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
  constructor(
    private updateService: UpdateService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
  }
  searchForm = this.formBuilder.group({
    keyword: [''],
  });
  search() {
    this.updateService.searchUsers(this.searchForm.value.keyword!).subscribe(
      (response) => {
        this.Users = response;
        console.log(this.Users);
        this.toaster.info('Found ' + this.Users.length + ' users');
      },
      (error) => {
        this.toaster.error('Error while searching');
      }
    );
  }
}
