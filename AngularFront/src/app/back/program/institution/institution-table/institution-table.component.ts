import {Component, Input, OnInit} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";
import {InstitutionListDTO} from "../../../../model/program/InstitutionListDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-institution-table',
  templateUrl: './institution-table.component.html',
  styleUrls: ['./institution-table.component.css']
})
export class InstitutionTableComponent implements OnInit {
  institutionResponse: InstitutionDTO[] = [];
  selectedInstitution: InstitutionDTO = {};
  selectedInstitutionUsers: string = "";
  messageSuccess: string = "";
  messageError: string = "";
  @Input() role: string = "";
  addForm = false
  usersTable = false
  updateForm = false
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  admins: string = "Admins"
  teachers: string = "Teachers"
  students: string = "Students"

  constructor(
    private institutionService: InstitutionService,
    private toaster: ToastrService
  ) {
  }

  showUsersTable(role: string, institutionID: string) {
    this.usersTable = true;
    this.role = role
    this.selectedInstitutionUsers = institutionID;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  showAddForm() {
    this.addForm = true
  }

  showUpdateForm(institution: InstitutionDTO) {
    this.selectedInstitution = institution;
    this.updateForm = true
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.fetchData();
  }
  fetchData(): void {
    this.institutionService.getPaginatedInstitution(this.currentPage, this.pageSize).subscribe(
      (response: InstitutionListDTO) => {
        this.institutionResponse = response.institutions!;
        console.log("institution in page " + this.currentPage + " :" + response.institutions)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        this.toaster.error("Error fetching institutions")
        console.error('Error fetching institutions:', error);
      }
    );
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }

  deleteInstitution(institutionID: string) {
    this.institutionService.deleteInstitution(institutionID).subscribe(
      data => {
        if (data) {
          this.institutionResponse = this.institutionResponse.filter(inst => inst.id !== institutionID);
          this.toaster.success('Institution removed successfully', 'Success')
          this.fetchData();
        } else {
          this.toaster.error('Error removing institution', 'Error')
        }
      },
      error => {
        console.log("add Institution error :", error)
        this.toaster.error('Error removing institution', 'Error')
      });
  }
  handleInstInfoChanged() {
    this.fetchData();
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

  handleUsersTableToggle(message: boolean) {
    this.usersTable = message;
  }

  handleErrorMessage(message: string) {
    this.messageError = message;
  }
}
