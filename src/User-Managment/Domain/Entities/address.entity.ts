import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Address")
export class Address {
    @PrimaryGeneratedColumn()
    addressId:number;
    @Column()
    addressName:string;
    @Column()
    addressIP: string;
}
