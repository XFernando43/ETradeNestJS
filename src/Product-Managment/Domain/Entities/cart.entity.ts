import { User } from "src/User-Managment/Domain/Entities/user.entity";
import { JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Cart {

    @PrimaryGeneratedColumn()
    cartId:number;
    @OneToOne(()=> User)
    @JoinColumn({name:'userId'})
    user:User;
    
}
