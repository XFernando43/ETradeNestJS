
import { Product } from "src/Product-Managment/product/Domain/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Category")
export class Category {
    @PrimaryGeneratedColumn()
    categoryId:number;
    @Column()
    categoryName:string;
    @OneToMany(()=> Product,(product)=>product.categoryId)
    products: Product[];
}
