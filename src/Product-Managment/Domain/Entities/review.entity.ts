import { User } from "src/User-Managment/Domain/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;
    @Column()
    content:string;

    @ManyToOne(()=> User,(User)=> User.reviews)
    @JoinColumn({name:'userId'})
    user:User;

    
    @ManyToOne(()=> Product,(Product)=> Product.reviews)
    @JoinColumn({name:'producId'})
    Product:Product;
}
