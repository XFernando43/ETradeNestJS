import { Address } from "src/User-Managment/address/Domain/entities/address.entity";
import { Role } from "src/User-Managment/role/entities/role.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
