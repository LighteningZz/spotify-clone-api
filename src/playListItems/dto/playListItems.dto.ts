import { ApiProperty } from '@nestjs/swagger';

export class PlayListItemsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
