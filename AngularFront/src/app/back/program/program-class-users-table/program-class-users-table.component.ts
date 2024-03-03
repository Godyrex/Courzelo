import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {InstitutionService} from "../../../service/program/institution.service";
import {UserListDTO} from "../../../model/user/UserListDTO";
import {ClassService} from "../../../service/program/class.service";

@Component({
  selector: 'app-program-class-users-table',
  templateUrl: './program-class-users-table.component.html',
  styleUrls: ['./program-class-users-table.component.css']
})
export class ProgramClassUsersTableComponent {
  usersResponse: UserResponse[] = [];
  messageSuccess: string = "";
  messageError: string = "";
  addForm: boolean = false;
  @Input() classID: string = '';
  @Input() @Output() role: string = "Students";
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(
    private classService: ClassService,
  ) {
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
    this.classService.removeUserFromClass(this.classID, email).subscribe(
      data => {
        if (data) {
          this.usersResponse = this.usersResponse.filter(inst => inst.email !== email);
          this.messageSuccess = "User removed";
          this.messageError = "";
        } else {
          this.messageSuccess = "";
          this.messageError = "error removing User";
        }
      },
      error => {
        console.log("remove User error :", error)
        this.messageSuccess = "";
        this.messageError = "an error has occurred";
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator " + page)
    this.loadUsers();
  }

  loadUsers(): void {

    this.classService.getClassUsers(this.classID, this.role, this.currentPage, this.pageSize).subscribe(
      (response: UserListDTO) => {
        this.usersResponse = response.userResponse!;
        console.log(this.role + " in page " + this.currentPage + " :" + response.userResponse)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching users:', error);
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
