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
  suggestedProgram: ProgramDTO = {};
  toggleSuggestedProgram = false;
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
    this.predictProgram();
  }
  predictProgram() {
  this.toggleSuggestedProgram = false;
    this.programService.predictProgram().subscribe(
      prediction => {
        console.log('Prediction:', prediction);
        this.suggestedProgram = prediction;
        //check if suggested program is already in my programs
        if(this.programs.find(program => program.id === this.suggestedProgram.id) === undefined)
        {
          this.toggleSuggestedProgram = true;
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
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
      this.predictProgram();
    },error=>{
      console.log(error);
      this.toaster.error("Error while leaving the program");
    })
  }

  joinProgram(s: string) {
    this.programService.joinProgramByID(s).subscribe(data=>{
      this.toaster.success("You have joined the program");
      this.predictProgram();
      this.getMyPrograms();
    },error => {
      console.log(error);
      this.toaster.error("Error while joining the program");
    })
  }
}
