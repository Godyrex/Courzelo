export class Comment {

    public static fromJson(json: any): Comment {
        return new Comment(
            json['id'],
            json['comment'],
            json['idUser'],
            json['idPost'],
            json['idPere'],
            json['date'],
        )

    }

    constructor(

        public id: string,
        public comment: string,
        public idUser: string,
        public idPost: string,
        public idPere: string,
        public date: Date,
    ) { }

}
