import {FieldOfStudy} from "./field-of-study";

export interface Departement {
  id: string;
  name: string;
  chefDepartment: string;
  fieldOfStudies: FieldOfStudy[];
}
