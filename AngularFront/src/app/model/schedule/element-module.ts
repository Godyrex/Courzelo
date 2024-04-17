import {Departement} from "./departement";
import {Semester} from "./semester";
import {Modul} from "./Modul";
import {ClassListDTO} from "../program/ClassListDTO";
import {UserResponse} from "../user/UserResponse";
import {FieldOfStudy} from "./field-of-study";

export interface ElementModule {
id:string;
  nmbrHours: number;
  name: string;
  dayOfWeek:string;
  period: string;
  classes:ClassListDTO;
  semesters: Semester[];
  departments: Departement[];
  fieldOfStudies:FieldOfStudy[];
  numSemesters: number;
  numDepartments: number;
  teacher:UserResponse;
  modul:Modul;

}
