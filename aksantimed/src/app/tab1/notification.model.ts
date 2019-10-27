export class Notification {
    photo: string;
    synopsis: string;
    constructor(public categorie: string,
                public datepostee: string,
                public description: string,
                public status: string,
                public titre: string,
                public url: string
    ) {
    }
}
