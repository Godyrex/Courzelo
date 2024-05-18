import { UserResponse } from "../user/UserResponse";
import { typereclamation } from "./typereclamation";

export interface reclamation {
    id : string,	
    sujet:string,	
    details:string,	
    dateCreation:Date,
    type:typereclamation,	
    status:string
}