export class CreateProductDto {
    productName: string;
    productDescription: string;
    productPrice: number;
    productStatus: string;
    productStock: number;

    categoryId:number;
}
