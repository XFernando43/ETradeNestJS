import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Emails")
export class Email {

    constructor(emailAddres:string, password:string){
        this.emailAddres = emailAddres;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    emailId: number;
    @Column()
    emailAddres: string;
    @Column()
    password: string;

    @OneToOne(()=> User)
    @JoinColumn({name:'UserId'})
    user:User;
}
