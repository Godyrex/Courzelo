import {Component, OnInit} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CalendarDTO} from "../../../../model/program/CalendarDTO";

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
constructor(private institutionService : InstitutionService,
            private formBuilder: FormBuilder
) {
}


  ngOnInit() {
    // Optional: Fetch initial events from backend or user storage
  }
  generateForm = this.formBuilder.group({
    month: ['', [Validators.required,Validators.min(1),Validators.max(12)]],
    day: ['', [Validators.required,Validators.min(1),Validators.max(31)]],
    name: ['', [Validators.required]],
  });


  addEvent(event: Event) {
    this.events.push(event); // Add user-defined event
  }
  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }
  generateExcel() {
    if (this.generateForm.valid) {
      this.generationEvent = Object.assign(this.generationEvent, this.generateForm.value);
      console.log(this.generationEvent);
      this.generationEventList.push(this.generationEvent);
      console.log(this.generationEventList);
      this.institutionService.generateExcel(this.generationEventList).subscribe(
      response => {
        console.log("success genereating")
        this.messageSuccess = "excel generated";
        this.messageError = "";
      }, error => {
        console.log("error generating");
        this.messageSuccess = "";
        this.messageError = "error generating excel";
      }
    )
  }
  }
}
