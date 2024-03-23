import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    userId:number;

    @Column()
    username:string;
    
    @Column()
    name:string;

    @Column()
    lastName:String;

    @Column()
    bornDate:Date;


    @ManyToOne(()=> Role,(Role)=> Role.users)
    @JoinColumn({name:'roleId'})
    role:Role;
}
