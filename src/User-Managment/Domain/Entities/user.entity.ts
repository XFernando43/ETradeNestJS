import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Address } from "./address.entity";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    userId:number;
    @Column()
    username:string;
    @Column()
    roleId:number;

    @OneToOne(()=> Role)
    @JoinColumn({name:'roleId'})
    role:Role;

    @OneToOne(()=> Address)
    @JoinColumn({name:'addresId'})
    addres:Address;
}
