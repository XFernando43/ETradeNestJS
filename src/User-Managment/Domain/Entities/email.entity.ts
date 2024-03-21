import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Emails")
export class Email {
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
