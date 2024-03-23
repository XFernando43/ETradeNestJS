import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../Entities/role.entity";

export class CreateUserDto {
    @ApiProperty()
    username:string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    lastName:String;
    @ApiProperty()
    bornDate:Date;

    role: Role;
}
