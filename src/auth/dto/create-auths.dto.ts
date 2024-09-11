import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities/users.entity";

export class CreateAuthsDto implements Partial<Users> {

    @ApiProperty({
        type: 'string',
    })
    email: string;
    @ApiProperty({
        type: 'string',
        nullable: true,
    })
    name: string | null;
    @ApiProperty({
        type: 'string',
    })
    password: string;
}
