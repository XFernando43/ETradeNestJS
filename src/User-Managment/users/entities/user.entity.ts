import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    userId:number;
    @Column()
    username:string;
    @Column()
    roleId:number;
}
