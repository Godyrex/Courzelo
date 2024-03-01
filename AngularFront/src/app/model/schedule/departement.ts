import {FieldOfStudy} from "./field-of-study";

export interface Departement {

  name:string;
  chefDepartment:string;
  fieldOfStudies:FieldOfStudy[];
}
