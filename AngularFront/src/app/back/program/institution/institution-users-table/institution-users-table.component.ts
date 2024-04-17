import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserResponse} from "../../../../model/user/UserResponse";
import {InstitutionService} from "../../../../service/program/institution.service";
import {UserListDTO} from "../../../../model/user/UserListDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-institution-users-table',
  templateUrl: './institution-users-table.component.html',
  styleUrls: ['./institution-users-table.component.css']
})
export class InstitutionUsersTableComponent implements OnInit {
  usersResponse: UserResponse[] = [];
  messageSuccess: string = "";
  messageError: string = "";
  addForm: boolean = false;
  @Input() institutionID: string = '';
  @Input() @Output() role: string = "Students";
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(
    private institutionService: InstitutionService,
    private toaster: ToastrService
  ) {
  }
  handleUserInfoChanged() {
    this.loadUsers();
  }
  close() {
    this.updateForm.emit(false)
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }

  removeUser(email: string) {
    this.institutionService.removeUserFromInstitution(this.institutionID, email).subscribe(
      data => {
        if (data) {
          this.usersResponse = this.usersResponse.filter(inst => inst.email !== email);
          this.toaster.success("User removed");
          this.loadUsers()
        } else {
this.toaster.error("User not removed");
        }
      },
      error => {
        console.log("remove User error :", error)
this.toaster.error("an error has occurred");
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator " + page)
    this.loadUsers();
  }

  loadUsers(): void {
    this.institutionService.getInstitutionUsers(this.institutionID, this.role, this.currentPage, this.pageSize).subscribe(
      (response: UserListDTO) => {
        this.usersResponse = response.userResponse!;
        console.log(this.role + " in page " + this.currentPage + " :" + response.userResponse)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        this.toaster.error("Error fetching users")
      }
    );
  }

  handleSuccessMessage(message: string) {
    this.messageSuccess = message;
  }

  handleAddFormToggle(message: boolean) {
    this.addForm = message;
  }

  handleErrorMessage(message: string) {
    this.messageError = message;
  }

  showAddForm() {
    this.addForm = true;
  }
}
