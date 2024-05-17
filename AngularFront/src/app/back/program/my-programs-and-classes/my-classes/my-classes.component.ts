import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../../../service/program/class.service";
import {ClassDTO} from "../../../../model/program/ClassDTO";
import {ToastrService} from "ngx-toastr";
import {ProgramService} from "../../../../service/program/program.service";
import {ProgramDTO} from "../../../../model/program/ProgramDTO";

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit{
  myClass : ClassDTO = {};
  myProgram : ProgramDTO = {};
  constructor(private classService:ClassService,private toaster:ToastrService,private programService:ProgramService) { }
  GetMyClass(){
    this.classService.getMyClass().subscribe(data=>{
      this.myClass = data;
      console.log(data);
      this.getProgramByClassId(this.myClass.id!);
    }, error=>{
      console.log(error);
    })
  }
  getProgramByClassId(classId:string) {
    this.programService.getProgramByClassID(classId).subscribe(data => {
      this.myProgram = data;
      console.log(data);
    }, error => {
      console.log(error);
    }
    );
  }
  ngOnInit(): void {
    this.GetMyClass();
  }

  protected readonly Object = Object;
}
