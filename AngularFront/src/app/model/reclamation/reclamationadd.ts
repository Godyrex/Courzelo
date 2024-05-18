import { UserResponse } from "../user/UserResponse";

export interface reclamationADD {
    id : string,	
    sujet:string,	
    details:string,	
    dateCreation:Date,
    type:string,	
    status:string
    user:UserResponse;

}