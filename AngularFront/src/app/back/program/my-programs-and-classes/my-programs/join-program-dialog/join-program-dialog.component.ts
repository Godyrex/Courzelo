import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProgramService} from "../../../../../service/program/program.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-join-program-dialog',
  templateUrl: './join-program-dialog.component.html',
  styleUrls: ['./join-program-dialog.component.css']
})
export class JoinProgramDialogComponent {
  key: string="";
  @Output() refresh = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<JoinProgramDialogComponent>,
    private programService: ProgramService,
    private toaster: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  joinProgram(): void {
    this.programService.joinProgram(this.key).subscribe(data => {
      if (data) {
        this.toaster.success("Joined program successfully");
        this.refresh.emit();
        this.dialogRef.close();
      } else {
        this.toaster.error("Failed to join program");
      }
    }, error => {
      this.toaster.error("Error while joining program");
    });
  }
}
