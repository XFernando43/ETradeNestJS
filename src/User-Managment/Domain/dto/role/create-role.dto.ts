import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty()
    roleName:string;
    @ApiProperty()
    roleDescription:string;
}
