import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity("Address")
export class Address {
    @PrimaryGeneratedColumn()
    addressId:number;
    @Column()
    addressName:string;
    @Column()
    addressIP: string;

    @OneToOne(()=> User)
    @JoinColumn({name:'userId'})
    user:User
}
