import {FieldOfStudy} from "./field-of-study";
import {Departement} from "./departement";
import {Semester} from "./semester";

export interface ElementModule {

    nmbrHours: number;
    name:string;
    module:string;
    departments:Departement[];
    semesters:Semester[];
    numSemesters:number;
    numDepartments:number;
  jour:            string;
  periode:     string;
}
