import {Departement} from "./departement";
import {Semester} from "./semester";
import {ElementModule} from "./element-module";

export interface TimeTable {
  name: string;
  departments: Departement[];
  semesters: Semester[];
  elementModules: ElementModule[];

}
