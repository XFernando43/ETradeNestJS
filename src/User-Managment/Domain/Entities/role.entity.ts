// import { User } from "src/User-Managment/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Roles")
export class Role {
    @PrimaryGeneratedColumn()
    roleId:number;
    @Column()
    roleName:string;
}