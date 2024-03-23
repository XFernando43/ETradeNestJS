import { Category } from 'src/Product-Managment/Domain/Entities/category.entity';
import { Column,  Entity,  JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

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
}
