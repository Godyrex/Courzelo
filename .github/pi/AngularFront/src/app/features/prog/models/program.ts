export class Program {

    public static fromJson(json: any): Program {
        return new Program(
            json['id'],
            json['name'],
            json['description'],
            json['type'],
        )

    }

    constructor(

        public id: number,
        public name: string,
        public description: number,
        public type: number,
    ) { }

}