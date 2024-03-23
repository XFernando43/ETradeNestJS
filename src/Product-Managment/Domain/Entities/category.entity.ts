
import { Product } from "src/Product-Managment/Domain/Entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Category")
export class Category {
    @PrimaryGeneratedColumn()
    categoryId:number;
    @Column()
    categoryName:string;
    @OneToMany(()=> Product,(product)=>product.category)
    products: Product[];
}
