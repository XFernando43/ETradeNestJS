import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { ReviewModule } from "src/Product-Managment/Infracstruture/review.module";
import { Review } from "src/Product-Managment/Domain/Entities/review.entity";

@Entity("Users")
export class User {
    constructor(name:string, username:string, lastname:string, bornDate:Date, role:Role){
        this.name = name;
        this.username = username;
        this.lastName = lastname;
        this.bornDate = bornDate;
        this.role = role;
    }
    @PrimaryGeneratedColumn()
    userId:number;
    @Column()
    username:string;
    @Column()
    name:string;
    @Column()
    lastName:string;
    @Column()
    bornDate:Date;
    @ManyToOne(()=> Role,(Role)=> Role.users)
    @JoinColumn({name:'roleId'})
    role:Role;

    
    @OneToMany(()=> User,(user)=> user.userId)
    reviews:Review[];
}
