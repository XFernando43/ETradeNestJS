import { Entity } from "typeorm";

@Entity("Product")
export class Product {
    productId:number;
    productName:string;
    
}
