import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {FormBuilder, Validators} from "@angular/forms";
import {UpdateService} from "../../../service/user/profile/update.service";
import {ToastrService} from "ngx-toastr";
import {map, Observable, of, startWith} from "rxjs";
import {SearchDTO} from "../../../model/user/SearchDTO";

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit{
  Users: UserResponse[] = [];
  page = 0;
  score = 0;
  isLoading = false;
  highestScore = 0;
  searchDTO: SearchDTO = {};
  filteredOptions: Observable<string[]> = of([]);
  options: string[] = [''];
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
  saveSearch() {
    this.searchDTO.query = this.searchForm.value.keyword!;
    console.log(this.searchDTO)
    this.updateService.saveSearch(this.searchDTO).subscribe(
    );
  }
  search() {
    this.isLoading = true; // Add this line
    this.page = 0;
    this.highestScore = 0;
    this.updateService.searchUsers(this.searchForm.value.keyword!, this.page).subscribe(
      (response) => {
        this.saveSearch();
        this.Users = response;
        console.log(this.Users);
        this.highestScore = Math.max(this.highestScore, ...this.Users.map(user => user.score!));
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false; // Add this line
      }
    );
  }
  isPerfect(user: UserResponse) {
    return user.score === this.highestScore;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(value => {
      this.getSearches();
    });
  }
  getSearches() {
    this.updateService.getSearches(this.searchForm.value.keyword!).subscribe(
      (response) => {
        this.options = response.map(search => search.query!);
        this.filteredOptions = of(this._filter(this.searchForm.value.keyword!));
      }
    );
  }
}
