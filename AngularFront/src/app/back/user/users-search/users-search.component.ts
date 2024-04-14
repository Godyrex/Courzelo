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
  score = 0;
  isLoading = false;
  highestScore = 0;
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
        this.highestScore = Math.max(this.highestScore, ...this.Users.map(user => user.score!));
        console.log(this.Users);
        this.isLoading = false;
      },
      (error) => {
        this.toaster.error('Error while searching');
        this.isLoading = false;
      }
    );

  }
  search() {
    this.isLoading = true; // Add this line
    this.page = 0;
    this.highestScore = 0;
    this.updateService.searchUsers(this.searchForm.value.keyword!, this.page).subscribe(
      (response) => {
        this.Users = response;
        console.log(this.Users);
        this.isLoading = false;
        this.highestScore = Math.max(this.highestScore, ...this.Users.map(user => user.score!));
      },
      (error) => {
        this.toaster.error('Error while searching');
        this.isLoading = false; // Add this line
      }
    );
  }
  isPerfect(user: UserResponse) {
    return user.score === this.highestScore;
  }
}
