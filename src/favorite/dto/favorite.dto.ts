import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
