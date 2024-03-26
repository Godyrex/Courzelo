import {Component, OnInit, Output} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionUsersCountDTO} from "../../../../model/program/institutionUsersCountDTO";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-institution-panel',
  templateUrl: './institution-panel.component.html',
  styleUrls: ['./institution-panel.component.css']
})
export class InstitutionPanelComponent implements OnInit {
  usersCount: InstitutionUsersCountDTO = {};
  totalCount: number = 0;
  showUsersTable: boolean = false
  @Output() role: string = ""
  admins: string = "Admins"
  teachers: string = "Teachers"
  students: string = "Students"
  myInstitution: InstitutionDTO = {};

  constructor(
    private institutionService: InstitutionService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.countUsers();
    this.getMyInstitution();
  }
  downloadExcel() {
    this.institutionService.downloadExcel().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.xlsx'; // You can set your own file name here
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.log("error downloading");
        this.toastr.error("Error downloading Excel.");
      }
    )
  }
  countUsers(): void {
    this.institutionService.countUsers().subscribe(
      (response: InstitutionUsersCountDTO) => {
        this.usersCount = response;
        this.totalCount = this.usersCount.teachers! + this.usersCount.admins! + this.usersCount.students!;
        console.log(response)
        console.log(this.usersCount)
      },
      (error: any) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  getMyInstitution(): void {
    this.institutionService.getMyInstitution().subscribe(
      (response: InstitutionDTO) => {
        this.myInstitution = response;
        console.log(response)
      },
      (error: any) => {
        console.error('Error fetching institution information:', error);
      }
    );
  }

  toggleUsersTable(role: string) {
    this.showUsersTable = !this.showUsersTable;
    this.role = role;
  }

  handleUsersTableToggle(message: boolean) {
    this.showUsersTable = message;
  }
}
