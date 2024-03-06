import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Exams } from '../model/exams';
import { Assignement } from '../model/assignement';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

constructor() { }

private course!:Course;
private  exams!:Exams;
private  assignement! :Assignement;


setCourse(course:Course):void{
  this.course=course;
}

getCourse():Course{
  return this.course;
}

setExam(exams:Exams):void{
  this.exams=exams;
}

getExam():Exams{
  return this.exams;
}

setAssignement(assignement:Assignement):void{
  this.assignement=assignement;
}

getAssignement():Assignement{
  return this.assignement;
}

}
