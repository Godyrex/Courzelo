import {ClassDTO} from "../program/ClassDTO";
import {ElementModule} from "./element-module";

export interface Modul{
  id:string;
  nmbrHours:number;
  name:string;
  isSeperated:Boolean ;
  isMetuale:Boolean ;
  aClass:ClassDTO;
  elementModules:ElementModule[];
}
