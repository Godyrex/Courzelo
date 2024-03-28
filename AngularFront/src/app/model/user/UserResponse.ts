import {ElementModule} from "../schedule/element-module";
import {NonDisponibility} from "../schedule/non-disponibility";

export interface UserResponse {
  id?: string;
  email?: string;
  name?: string;
  lastname?: string;
  roles?: string[];
  enabled: boolean;
  ban: boolean;
  elementModules:ElementModule[];
  nonDisponibilities:NonDisponibility[];
}
