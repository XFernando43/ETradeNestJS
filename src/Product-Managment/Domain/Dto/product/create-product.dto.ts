import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    productName: string;
    @ApiProperty()
    productDescription: string;
    @ApiProperty()
    productPrice: number;
    @ApiProperty()
    productStatus: string;
    @ApiProperty()
    productStock: number;
    
    @ApiProperty()
    categoryId:number;
}
