import {Component, OnInit} from '@angular/core';
import {ProgramDTO} from "../../../model/program/ProgramDTO";
import {ProgramListDTO} from "../../../model/program/ProgramListDTO";
import {ProgramService} from "../../../service/program/program.service";

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.css']
})
export class ProgramTableComponent implements OnInit {
  programDTOS: ProgramDTO[] = [];
  selectedProgram: ProgramDTO = {};
  selectedProgramClass: string = "";
  messageSuccess: string = "";
  messageError: string = "";
  addForm = false
  classesTable = false
  updateForm = false
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(
    private programService: ProgramService,
  ) {
  }

  showClassesTable(ProgramID: string) {
    this.classesTable = true;
    this.selectedProgramClass = ProgramID;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  showAddForm() {
    this.addForm = true
  }

  showUpdateForm(programDTO: ProgramDTO) {
    this.selectedProgram = programDTO;
    this.updateForm = true
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.fetchData();
  }

  fetchData(): void {
    this.programService.getPaginatedPrograms(this.currentPage, this.pageSize).subscribe(
      (response: ProgramListDTO) => {
        this.programDTOS = response.programs!;
        console.log("programs in page " + this.currentPage + " :" + response.programs)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }

  deleteInstitution(programID: string) {
    this.programService.deleteProgram(programID).subscribe(
      data => {
        if (data) {
          this.programDTOS = this.programDTOS.filter(prog => prog.id !== programID);
          this.messageSuccess = "Program removed";
          this.messageError = "";
        } else {
          this.messageSuccess = "";
          this.messageError = "error removing program";
        }
      },
      error => {
        console.log("delete program error :", error)
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

  handleClassesTableToggle(message: boolean) {
    this.classesTable = message;
  }

  handleErrorMessage(message: string) {
    this.messageError = message;
  }
}
