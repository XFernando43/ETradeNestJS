import { Entity, PrimaryColumn } from "typeorm";

@Entity('cartXproducts')
export class Cart {
    constructor(cartId:number, productId:number){
        this.cartId=cartId;
        this.producItd=productId;
    }
    @PrimaryColumn()
    cartId:number;
    @PrimaryColumn()
    producItd:number;
    
}