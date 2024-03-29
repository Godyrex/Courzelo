import {Component, OnInit} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarDTO} from "../../../../model/program/CalendarDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  messageSuccess: string = "";
  messageError: string = "";
  generationEvent : CalendarDTO = {};
  generationEventList : CalendarDTO[] = [];
  year: number = new Date().getFullYear(); // Set current year as default
  events: Event[] = []; // User-defined events
  bsValue = new Date();
  maxDate =new Date(2024, 11, 31);
  minDate = new Date(2024, 0, 1);
  constructor(private institutionService : InstitutionService,
            private formBuilder: FormBuilder,
             private toastr: ToastrService

) {
}


  ngOnInit() {
  this.generationEvent.startDate = new Date();
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
  generateForm = this.formBuilder.group({
    startDate: [this.bsValue, [Validators.required]],
    finishDate: [this.bsValue, [Validators.required]],
    name: ['', [Validators.required,Validators.maxLength(15)]],
    color: ['#FFFF00', [Validators.required]],
  }, { validators: [this.sameMonth, this.dateOrder] });
  returnEvent(form : FormGroup) : CalendarDTO {
    return Object.assign(this.generationEvent, form.value, {color: form.controls['color'].value});
  }
  dateOrder(control: FormGroup): {[key: string]: boolean} | null {
    const startDate = control.get('startDate');
    const finishDate = control.get('finishDate');

    if (startDate && finishDate && startDate.value.getTime() > finishDate.value.getTime()) {
      return {'invalidDateOrder': true};
    }

    return null;
  }
  isOverlapping(event1: CalendarDTO, event2: CalendarDTO): boolean {
    return new Date(event1.startDate!).getTime() <= new Date(event2.finishDate!).getTime() &&
      new Date(event1.finishDate!).getTime() >= new Date(event2.startDate!).getTime();
  }
  sameMonth(control: FormGroup): {[key: string]: boolean} | null {
    const startDate = control.get('startDate');
    const finishDate = control.get('finishDate');

    if (startDate && finishDate && startDate.value.getMonth() !== finishDate.value.getMonth()) {
      return {'differentMonth': true};
    }

    return null;
  }
  addEvent() {
    if (this.generateForm.valid) {
      const newEvent = this.returnEvent(this.generateForm);
      for (const event of this.generationEventList) {
        if (this.isOverlapping(newEvent, event)) {
          this.toastr.error("Event overlaps with an existing event.");
          return;
        }
      }
      const clonedEvent = JSON.parse(JSON.stringify(newEvent));
      this.generationEventList.push(clonedEvent);
      this.toastr.success("Event added successfully.");
    } else {
      this.toastr.error("Form is not valid.");
    }
  }
  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }
  generateExcel() {
    console.log("Events being generated : "+this.generationEventList);
    this.institutionService.generateExcel(this.generationEventList).subscribe(
      response => {
        console.log("success generating")
        this.toastr.success("Excel generated successfully.");
      }, error => {
        console.log("error generating");
        this.toastr.error("Error generating Excel.");
      }
    )
  }

  protected readonly Date = Date;
}
