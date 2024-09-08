
import {Gender} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class ProfilesDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
bio: string ;
@ApiProperty({
  type: 'string',
})
image: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateofbirth: Date ;
@ApiProperty({
  enum: Gender,
})
gender: Gender ;
}
