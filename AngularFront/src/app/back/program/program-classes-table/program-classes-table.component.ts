import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassDTO} from "../../../model/program/ClassDTO";
import {ProgramService} from "../../../service/program/program.service";
import {ClassListDTO} from "../../../model/program/ClassListDTO";

@Component({
  selector: 'app-program-classes-table',
  templateUrl: './program-classes-table.component.html',
  styleUrls: ['./program-classes-table.component.css']
})
export class ProgramClassesTableComponent implements OnInit {
  classDTOS: ClassDTO[] = [];
  selectedClass: ClassDTO = {};
  messageSuccess: string = "";
  messageError: string = "";
  addForm: boolean = false;
  @Input() @Output() programID: string = '';
  @Output() updateClassTable: EventEmitter<boolean> = new EventEmitter<boolean>();
  updateForm: boolean = false;
  @Input() role: string = "";
  selectedClassUsers: string = "";
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  teachers: string = "Teachers"
  students: string = "Students"
  usersTable = false

  constructor(
    private programService: ProgramService,
  ) {
  }

  close() {
    this.updateClassTable.emit(false)
  }

  ngOnInit(): void {
    this.loadClasses()
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  handleUpdateFormToggle(message: boolean) {
    this.updateForm = message;
  }

  resetErrorAlert() {
    this.messageError = "";
  }

  removeClass(id: string) {
    this.programService.removeClassFromProgram(id).subscribe(
      data => {
        if (data) {
          this.classDTOS = this.classDTOS.filter(inst => inst.id !== id);
          this.messageSuccess = "class removed";
          this.messageError = "";
        } else {
          this.messageSuccess = "";
          this.messageError = "error removing class";
        }
      },
      error => {
        console.log("remove class error :", error)
        this.messageSuccess = "";
        this.messageError = "an error has occurred";
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator " + page)
    this.loadClasses();
  }

  showClassesUsersTable(role: string, id: string) {
    this.usersTable = true;
    this.role = role
    this.selectedClassUsers = id;
  }

  loadClasses(): void {
    this.programService.getProgramClasses(this.programID, this.currentPage, this.pageSize).subscribe(
      (response: ClassListDTO) => {
        this.classDTOS = response.classes!;
        console.log(" classes in page " + this.currentPage + " :" + response.classes)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  showUpdateForm(classDTO: ClassDTO) {
    this.selectedClass = classDTO;
    this.updateForm = true
  }

  handleSuccessMessage(message: string) {
    this.messageSuccess = message;
  }

  handleAddFormToggle(message: boolean) {
    this.addForm = message;
  }

  handleUsersTableToggle(message: boolean) {
    this.usersTable = message;
  }

  handleErrorMessage(message: string) {
    this.messageError = message;
  }

  showAddForm() {
    this.addForm = true;
  }
}
