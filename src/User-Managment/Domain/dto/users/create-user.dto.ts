import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../Entities/role.entity";

export class CreateUserDto {
    @ApiProperty()
    username:string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    lastName:string;
    @ApiProperty()
    bornDate:Date;

    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;

    role: Role;
}
