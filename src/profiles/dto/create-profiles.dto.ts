
import {Gender} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsNotEmpty,IsString} from 'class-validator'




export class CreateProfilesDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
bio: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
image: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
@IsNotEmpty()
@IsDateString()
dateofbirth: Date ;
@ApiProperty({
  enum: Gender,
})
@IsNotEmpty()
gender: Gender ;
}
