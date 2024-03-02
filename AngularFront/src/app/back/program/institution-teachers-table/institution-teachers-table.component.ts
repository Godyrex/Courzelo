import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {InstitutionService} from "../../../service/program/institution.service";
import {UserListDTO} from "../../../model/user/UserListDTO";

@Component({
  selector: 'app-institution-teachers-table',
  templateUrl: './institution-teachers-table.component.html',
  styleUrls: ['./institution-teachers-table.component.css']
})
export class InstitutionTeachersTableComponent implements OnInit{
  usersResponse : UserResponse[]=[];
  messageSuccess : string = "";
  messageError : string = "";
  addForm : boolean =false;
  @Input() institutionID : string='';
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  close(){
    this.updateForm.emit(false)
  }
  constructor(
    private institutionService: InstitutionService,
  ) {
  }
  ngOnInit(): void {
    this.loadUsers()
  }
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator"+page)
    this.loadUsers();
  }
  loadUsers(): void {
    this.institutionService.getInstitutionTeachers(this.institutionID,this.currentPage, this.pageSize).subscribe(
      (response: UserListDTO) => {
        this.usersResponse = response.userResponse!;
        console.log("students in page "+this.currentPage+" :"+response.userResponse)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : "+response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  removeUser(email:string){
    this.institutionService.removeUser(this.institutionID,email).subscribe(
      data => {
        if(data){
          this.usersResponse = this.usersResponse.filter(inst => inst.email !== email);
          this.messageSuccess = "User removed";
          this.messageError = "";
        }else{
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
  resetSuccessAlert(){
    this.messageSuccess ="";
  }
  resetErrorAlert(){
    this.messageError ="";
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
  showAddForm(){
    this.addForm = true;
  }
}
