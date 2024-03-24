import { Entity, PrimaryColumn } from "typeorm";


// aun no se ha hecho su repo
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