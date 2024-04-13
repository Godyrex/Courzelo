import {InstitutionDTO} from "../program/InstitutionDTO";
import {ClassDTO} from "../program/ClassDTO";
import {ProgramDTO} from "../program/ProgramDTO";

export interface UserEducation {
  institution?: InstitutionDTO;
  stclass?: ClassDTO;
  program?: ProgramDTO[];
}
