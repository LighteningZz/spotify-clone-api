import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    nullable: true,
  })
  image: string | null;
  @ApiProperty({
    type: 'string',
  })
  password: string;
}
