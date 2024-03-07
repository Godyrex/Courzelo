import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {NonDisponibility} from "../../../../model/schedule/non-disponibility";
import {NonDisponibilityService} from "../../../../service/schedule/non-disponibility.service";
import {AddNonDisponibilityComponent} from "../../add/add-non-disponibility/add-non-disponibility.component";

@Component({
  selector: 'app-non-disponibility',
  templateUrl: './non-disponibility.component.html',
  styleUrls: ['./non-disponibility.component.css']
})
export class NonDisponibilityComponent {
  nonDisponibilities: NonDisponibility[] = [];
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
  selectedNDB: NonDisponibility = {id: '', day: "", period: ''};
  isEditFormVisible = false;

  constructor(private nonDisponibilityService: NonDisponibilityService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchNDB();
    this.nonDisponibilityService.getAllNDB();
    this.fetchNDB();
  }

  toggleAddFormVisibility(): void {
    this.addFormVisible = !this.addFormVisible;
  }

  handleUpdateFormToggle(isVisible: boolean) {
    this.isEditFormVisible = isVisible;
  }

  fetchNDB(): void {
    this.nonDisponibilityService.getAllNDB()
      .subscribe(nonDisponibilities => {
        this.nonDisponibilities = nonDisponibilities;
        console.log('NonDisponibilities:', this.nonDisponibilities);
        console.log('NonDisponibilities:', nonDisponibilities);
      });
  }

  showUpdateForm(nonDisponibility: NonDisponibility) {
    this.selectedNDB = nonDisponibility;
    this.isEditFormVisible = true;
  }


  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.handleSearchNDB();
  }

  handleSearchNDB(): void {
    const keyword = this.searchFormGroup.value.keyword.trim().toLowerCase();
    if (!keyword) {
      this.nonDisponibilities = [];
      this.setDisplayedPages();
      return;
    }
    this.nonDisponibilityService.searchNdb(keyword).subscribe(
      (data) => {
        this.nonDisponibilities = data;
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

  handleDeleteNDB(nonDisponibility: NonDisponibility): void {
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
        console.log('Departments:', this.nonDisponibilities);
        this.nonDisponibilityService.deleteNdb(nonDisponibility.id).subscribe(
          () => {
            this.nonDisponibilities = this.nonDisponibilities.filter((n) => n.id !== nonDisponibility.id);
            Swal.fire('Deleted!', 'The non Disponibility has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete the non Disponibility.', 'error');
          }
        );
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.fetchNDB();
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
    this.handleSearchNDB();
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
      this.handleSearchNDB();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchNDB();
    }
  }

  openAddNDBDialog(): void {
    const dialogRef = this.dialog.open(AddNonDisponibilityComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.NDBAdded.subscribe((newNDB: NonDisponibility) => {

      this.nonDisponibilities.push(newNDB);
    });
  }
}
