export class User {

    public can_vote: boolean;
    public id: number;
    public json_metadata: string;
    public name: string;
    public voting_power: number;


    constructor(can_vote: boolean,
                id: number,
                json_metadata: string,
                name: string,
                voting_power: number) {
        this.can_vote = can_vote;
        this.id = id;
        this.json_metadata = json_metadata;
        this.name = name;
        this.voting_power = voting_power;
    }

}
