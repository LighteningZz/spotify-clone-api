
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString} from 'class-validator'




export class CreateAlbumsDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
image: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
name: string ;
}
