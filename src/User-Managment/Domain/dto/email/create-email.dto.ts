export class CreateEmailDto {

    constructor(emailAddres:string, password:string, userId:number){
        this.emailAddres=emailAddres;
        this.password=password;
        this.userId=userId;
    }

    emailAddres: string;
    password: string;
    userId:number;
}
