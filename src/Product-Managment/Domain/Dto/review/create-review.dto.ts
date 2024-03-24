import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty()
    content:string;
    @ApiProperty()
    userId:number;
    @ApiProperty()
    ProductId:number;
}
