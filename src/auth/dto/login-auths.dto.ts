import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthsDto  {
    @ApiProperty({
        type: 'string',
    })
    email: string;
    @ApiProperty({
        type: 'string',
    })
    password: string;
}
