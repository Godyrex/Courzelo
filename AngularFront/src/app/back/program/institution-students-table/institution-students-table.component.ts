import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {InstitutionService} from "../../../service/program/institution.service";
import {InstitutionListDTO} from "../../../model/program/InstitutionListDTO";
import {UserListDTO} from "../../../model/user/UserListDTO";

@Component({
  selector: 'app-institution-students-table',
  templateUrl: './institution-students-table.component.html',
  styleUrls: ['./institution-students-table.component.css']
})
export class InstitutionStudentsTableComponent implements OnInit{
  usersResponse : UserResponse[]=[];
  messageSuccess : string = "";
  messageError : string = "";
  addForm : boolean =false;
  @Input() institutionID : string='';
  @Output() updateForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
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
  resetSuccessAlert(){
    this.messageSuccess ="";
  }
  resetErrorAlert(){
    this.messageError ="";
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
  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator"+page)
    this.loadUsers();
  }
  loadUsers(): void {
    this.institutionService.getInstitutionStudent(this.institutionID,this.currentPage, this.pageSize).subscribe(
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
