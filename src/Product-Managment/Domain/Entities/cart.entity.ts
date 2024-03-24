import { User } from "src/User-Managment/Domain/Entities/user.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
    constructor(user:User){
        this.user=user;
    }
    @PrimaryGeneratedColumn()
    cartId:number;
    @OneToOne(()=> User)
    @JoinColumn({name:'userId'})
    user:User;
    
}
