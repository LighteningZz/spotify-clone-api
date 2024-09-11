import { ApiProperty } from '@nestjs/swagger';

export class PlayListsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'boolean',
  })
  public: boolean;
}
