import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TracksDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  duration: Prisma.Decimal;
}
