import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AddDepartementComponent} from "../../add/add-departement/add-departement.component";
import {MatDialog} from "@angular/material/dialog";
import {Departement} from "../../../../model/schedule/departement";
import {DepartmentService} from "../../../../service/schedule/department.service";

@Component({
  selector: 'app-gestion-departement',
  templateUrl: './gestion-departement.component.html',
  styleUrls: ['./gestion-departement.component.css']
})

export class GestionDepartementComponent {

  departments: Departement[] = [];
  selectedDepartments: Departement | null = null;

  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;

  displayedPages: number[] = [];
  addForm = false
  updateForm = false;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  messageSuccess: string = "";
  messageError: string = "";
  addFormVisible: boolean = false;
  selectedDepartment: Departement = {chefDepartment: "", fieldOfStudies: [], id: "", name: ""};
  isEditFormVisible = false;

  constructor(private departmentService: DepartmentService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchDepartments();
    this.departmentService.getAllDepartements();
    this.fetchDepartments();
  }

  toggleAddFormVisibility(): void {
    this.addFormVisible = !this.addFormVisible;
  }

  handleUpdateFormToggle(isVisible: boolean) {
    this.isEditFormVisible = isVisible;
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartements()
      .subscribe(departments => {
        this.departments = departments;
        console.log('Departments:', this.departments);
      });
  }

  showUpdateForm(department: Departement) {
    this.selectedDepartment = department;
    this.isEditFormVisible = true;
  }


  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.handleSearchDepartments();
  }

  handleSearchDepartments(): void {
    const keyword = this.searchFormGroup.value.keyword.trim().toLowerCase();
    if (!keyword) {
      this.departments = [];
      this.setDisplayedPages();
      return;
    }
    this.departmentService.searchDepartments(keyword, 0, 20).subscribe(
      (data) => {
        this.departments = data;
        this.setDisplayedPages();
      },
      (error) => {
        this.errorMessage = error;
        console.log(error);
      }
    );
  }


  showAddForm(): void {
    this.addFormVisible = true;
  }

  handleDeleteDepartment(department: Departement): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You can't undo this step!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Departments:', this.departments);
        this.departmentService.deleteDepartment(department.id).subscribe(
          () => {
            this.departments = this.departments.filter((d) => d.id !== department.id);
            Swal.fire('Deleted!', 'The department has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete the department.', 'error');
          }
        );
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.fetchDepartments();
  }

  setDisplayedPages(): void {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (
      let i = startPage;
      i < startPage + 3 && i < this.totalPages;
      i++
    ) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.handleSearchDepartments();
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
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

  goToPreviousSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
      this.handleSearchDepartments();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchDepartments();
    }
  }

  openAddDepartmentDialog(): void {
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.departmentAdded.subscribe((newDepart: Departement) => {

      this.departments.push(newDepart);
    });
  }


}
