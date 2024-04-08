import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../../../../service/program/program.service";
import {ToastrService} from "ngx-toastr";
import {ProgramDTO} from "../../../../model/program/ProgramDTO";
import {MatDialog} from "@angular/material/dialog";
import {JoinProgramDialogComponent} from "./join-program-dialog/join-program-dialog.component";

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.css']
})
export class MyProgramsComponent implements OnInit{
  programs: ProgramDTO[] = [];
  constructor(private dialog: MatDialog,private programService: ProgramService, private toaster: ToastrService) {
  }

  openJoinProgramDialog(): void {
    const dialogRef = this.dialog.open(JoinProgramDialogComponent, {
      width: '250px'});
    dialogRef.componentInstance.refresh.subscribe(() => {
      this.getMyPrograms();
    });
  }
  ngOnInit(): void {
    this.getMyPrograms();
  }
  getMyPrograms(){
    this.programService.getMyPrograms().subscribe(data=>{
      this.programs = data.programs!;
      console.log(data);
    },error=>{
      console.log(error);
      this.toaster.error("Error while fetching programs");
    })
  }
  leaveProgram(programId: string){
    this.programService.leaveProgram(programId).subscribe(data=>{
      this.toaster.success("You have left the program");
      this.getMyPrograms();
    },error=>{
      console.log(error);
      this.toaster.error("Error while leaving the program");
    })
  }
}
