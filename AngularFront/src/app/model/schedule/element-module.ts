import {Departement} from "./departement";
import {Semester} from "./semester";
import {Modul} from "./Modul";
import {ClassListDTO} from "../program/ClassListDTO";
import {UserResponse} from "../user/UserResponse";

export interface ElementModule {
id:string;
  nmbrHours: number;
  name: string;
  dayOfWeek:String;
  period: string;
  classes:ClassListDTO;
  semesters: Semester[];
  departments: Departement[];
  numSemesters: number;
  numDepartments: number;
  teacher:UserResponse;
  modul:Modul;

}
