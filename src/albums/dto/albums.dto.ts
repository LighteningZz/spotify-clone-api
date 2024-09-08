
import {ApiProperty} from '@nestjs/swagger'


export class AlbumsDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
image: string ;
@ApiProperty({
  type: 'string',
})
name: string ;
}
