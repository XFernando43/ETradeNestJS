import { User } from "src/User-Managment/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
