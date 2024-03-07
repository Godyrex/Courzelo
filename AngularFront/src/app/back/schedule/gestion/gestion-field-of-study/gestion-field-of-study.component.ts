import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FieldOfstudyService} from "../../../../service/schedule/field-ofstudy.service";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import Swal from "sweetalert2";
import {AddFieldOfStudyComponent} from "../../add/add-field-of-study/add-field-of-study.component";

@Component({
  selector: 'app-gestion-field-of-study',
  templateUrl: './gestion-field-of-study.component.html',
  styleUrls: ['./gestion-field-of-study.component.css']
})
export class GestionFieldOfStudyComponent {
  fields: FieldOfStudy[] = [];
  isEditFormVisible = false;
  selectedField: FieldOfStudy = {id: "", name: "", numbrWeeks: 0, chefField: "", departmentID: ''};
  private errorMessage: any;
  displayedPages: number[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;
  messageSuccess: string = "";
  messageError: string = "";
  addFormVisible: boolean = false;
  page: number = 0;
  size: number = 6;
  searchFormGroup!: FormGroup;
  private addForm = false;
  updateForm = false;


  constructor(private fieldOfstudyService: FieldOfstudyService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchField();
    this.fieldOfstudyService.getAllFilieres();
    this.fetchFields();
  }


  private fetchFields() {
    this.fieldOfstudyService.getAllFilieres()
      .subscribe(fields => {
        this.fields = fields;
        console.log('Fields:', this.fields);
      });
  }

  showUpdateForm(fieldOfStudy: FieldOfStudy) {
    this.selectedField = fieldOfStudy;
    this.isEditFormVisible = true;
  }

  handleSearchField(): void {
    const keyword = this.searchFormGroup.value.keyword.trim().toLowerCase();
    if (!keyword) {
      this.fields = [];
      this.setDisplayedPages();
      return;
    }
    this.fieldOfstudyService.searchFields(keyword).subscribe(
      (data) => {
        this.fields = data;
        this.setDisplayedPages();
      },
      (error) => {
        this.errorMessage = error;
        console.log(error);
      }
    );
  }

  handleUpdateFormToggle(isVisible: boolean) {
    this.isEditFormVisible = isVisible;
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.handleSearchField();
  }

  handleDeleteField(field: FieldOfStudy): void {
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
        console.log('Fields:', this.fields);
        this.fieldOfstudyService.deleteField(field.id).subscribe(
          () => {
            this.fields = this.fields.filter((f) => f.id !== field.id);
            Swal.fire('Deleted!', 'The Field  has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete the field.', 'error');
          }
        );
      }
    });
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
      this.handleSearchField();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchField();
    }
  }

  openAddFieldDialog(): void {
    const dialogRef = this.dialog.open(AddFieldOfStudyComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.fieldAdded.subscribe((newField: FieldOfStudy) => {

      this.fields.push(newField);
    });
  }


}
