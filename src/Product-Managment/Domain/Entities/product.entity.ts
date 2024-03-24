import { Category } from 'src/Product-Managment/Domain/Entities/category.entity';
import { Column,  Entity,  JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Review } from './review.entity';

@Entity('Product')
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;
    @Column()
    productName: string;
    @Column()
    productDescription: string;
    @Column()
    productPrice: number;
    @Column()
    productStatus: string;
    @Column()
    productStock: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;


    @OneToMany(()=> Review,(Review)=> Review.Product)
    reviews:Review[];
}
