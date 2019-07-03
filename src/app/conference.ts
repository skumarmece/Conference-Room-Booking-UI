export class Conference {
    constructor(){
        this.id=0;
        this.purpose = "";
        this.description = "";
        this.fromTime = new Date();;
        this.toTime = new Date();;
    };

    id: number;
    purpose: string;
    description: string;
    fromTime: Date;
    toTime: Date;
}