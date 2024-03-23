import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../Entities/role.entity";

export class UpdateUserDto {
    constructor(username: string, name: string, lastName: string, role?: Role) {
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
    }
    @ApiProperty()
    username: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    roleId: number;
    
    role?: Role;
}

