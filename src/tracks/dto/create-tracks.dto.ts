import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTracksDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDecimal()
  duration?: Prisma.Decimal | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  durationText?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  url?: string | null;
}
