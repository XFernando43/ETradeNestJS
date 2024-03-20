import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Roles")
export class Role {
    @PrimaryGeneratedColumn()
    roleId:number;
    @Column()
    roleName:string;
}