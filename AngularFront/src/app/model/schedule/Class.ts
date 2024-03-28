import {ClassDTO} from "../program/ClassDTO";
import {FieldOfStudy} from "./field-of-study";
import {Semester} from "./semester";
import {Modul} from "./Modul";

export interface Class extends ClassDTO{
  fieldOfStudy:FieldOfStudy;
  semester:Semester;
  moduls:Modul[];
}
