export class University {

    public static fromJson(json: any): University {
        return new University(
            json['id'],
            json['name'],
            json['location'],
            json['description'],
            json['website'],
        )

    }

    constructor(

        public id: number,
        public name: string,
        public location: string,
        public description: number,
        public website: number,
    ) { }

}