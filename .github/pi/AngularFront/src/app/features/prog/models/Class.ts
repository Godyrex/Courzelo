import { Program } from "./program";

export class Class {

    public static fromJson(json: any): Class {
        return new Class(
            json['id'],
            json['name'],
            json['capacity'],
            json['programs'],
        )

    }

    constructor(

        public id: number,
        public name: string,
        public capacity: number,
        public programs: Program,
    ) { }

}