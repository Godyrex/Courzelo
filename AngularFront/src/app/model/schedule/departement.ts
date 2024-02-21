import {FieldOfStudy} from "./field-of-study";

export interface Departement {
  chefDepartement:string;
  name:string;
  FieldOfStudies:FieldOfStudy[];
}
