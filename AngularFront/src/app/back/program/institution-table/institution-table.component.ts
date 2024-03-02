import {Component, OnInit} from '@angular/core';
import {InstitutionService} from "../../../service/program/institution.service";
import {InstitutionDTO} from "../../../model/program/InstitutionDTO";
import {UserResponse} from "../../../model/user/UserResponse";
import {Router} from "@angular/router";
import {InstitutionListDTO} from "../../../model/program/InstitutionListDTO";

@Component({
  selector: 'app-institution-table',
  templateUrl: './institution-table.component.html',
  styleUrls: ['./institution-table.component.css']
})
export class InstitutionTableComponent implements OnInit{
  institutionResponse : InstitutionDTO[]=[];
   selectedInstitution: InstitutionDTO={};
  selectedInstitutionUsers: string="";
  messageSuccess : string = "";
   messageError : string = "";
   addForm = false
    adminsTable = false
  teachersTable = false
  studentsTable = false
  updateForm = false
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  constructor(
    private institutionService: InstitutionService,
  ) {
  }
  showAdminTable(institutionID :string){
     this.adminsTable= true;
     this.selectedInstitutionUsers = institutionID;
  }
  showTeacherTable(institutionID :string){
    this.teachersTable= true;
    this.selectedInstitutionUsers = institutionID;
  }
  showStudentTable(institutionID :string){
    this.studentsTable= true;
    this.selectedInstitutionUsers = institutionID;
  }
  ngOnInit(): void {
    this.fetchData();
  }
  showAddForm() {
    this.addForm = true
  }
  showUpdateForm(institution : InstitutionDTO) {
      this.selectedInstitution = institution;
    this.updateForm = true
  }
  loadInstitutions(): void {
    this.institutionService.getAllInstitutions().subscribe(
      (response: InstitutionDTO[]) => {
        this.institutionResponse = response;
      },
      (error: any) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator"+page)
    this.fetchData();
  }
  fetchData(): void {
    this.institutionService.getPaginatedInstitution(this.currentPage, this.pageSize).subscribe(
      (response: InstitutionListDTO) => {
        this.institutionResponse = response.institutions!;
        console.log("institution in page "+this.currentPage+" :"+response.institutions)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : "+response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  resetSuccessAlert(){
     this.messageSuccess ="";
  }
  resetErrorAlert(){
    this.messageError ="";
  }
  deleteInstitution(institutionID : string){
    this.institutionService.deleteInstitution(institutionID).subscribe(
      data => {
        if(data){
            this.institutionResponse = this.institutionResponse.filter(inst => inst.id !== institutionID);
            this.messageSuccess = "Institution removed";
          this.messageError = "";
        }else{
          this.messageSuccess = "";
          this.messageError = "error removing institution";
        }
      },
      error => {
        console.log("add Institution error :", error)
        this.messageSuccess = "";
        this.messageError = "an error has occurred";
      });
  }
  handleSuccessMessage(message: string) {
    this.messageSuccess = message;
  }
  handleAddFormToggle(message: boolean) {
    this.addForm = message;
  }
  handleUpdateFormToggle(message: boolean) {
    this.updateForm = message;
  }
  handleAdminTableToggle(message: boolean) {
    this.adminsTable = message;
  }
  handleTeacherTableToggle(message: boolean) {
    this.teachersTable = message;
  }
  handleStudentTableToggle(message: boolean) {
    this.studentsTable = message;
  }

  handleErrorMessage(message: string) {
    this.messageError = message;
  }
}
