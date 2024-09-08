import { ApiProperty } from '@nestjs/swagger';

export class AlbumsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
