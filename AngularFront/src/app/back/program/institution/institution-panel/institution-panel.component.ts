import {Component, OnInit, Output} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionUsersCountDTO} from "../../../../model/program/institutionUsersCountDTO";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";

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
  ) {
  }

  ngOnInit(): void {
    this.countUsers();
    this.getMyInstitution();
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
