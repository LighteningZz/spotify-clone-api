
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class TracksDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
title: string ;
@ApiProperty({
  type: 'string',
})
image: string ;
@ApiProperty({
  type: 'number',
  format: 'double',
  nullable: true,
})
duration: Prisma.Decimal  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
durationText: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
url: string  | null;
}
