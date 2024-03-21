// import { User } from "src/User-Managment/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Roles")
export class Role {
    @PrimaryGeneratedColumn()
    roleId:number;
    @Column()
    roleName:string;
    @Column()
    roleDescription:string;

    @OneToMany(()=> User,(User)=> User.role)
    users:User[]
}