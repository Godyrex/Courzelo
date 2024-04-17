import {UserResponse} from "../user/UserResponse";
import {FieldOfStudy} from "./field-of-study";
import {Departement} from "./departement";
import {ClassDTO} from "../program/ClassDTO";


export interface PageProf {
    content:          UserResponse[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;

}
export interface PageDepartment {
    content:          Departement[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;

}
export interface PageField {
    content:          FieldOfStudy[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
}
export interface PageClasse {
    content:          ClassDTO[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
}
