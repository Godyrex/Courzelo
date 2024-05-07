import { Comment } from '../../comment/models/comment';

export class Post {

    public static fromJson(json: any): Post {
        return new Post(
            json['id'],
            json['description'],
            json['userId'],
            json['img'],
            json['imageUrl'],
            json['comments'],
        )

    }

    constructor(

        public id: number,
        public description: string,
        public userId: string,
        public img:string,
        public imageUrl:string,
        public comments: Comment[],
    ) { }

}
