import { ApiProperty } from '@nestjs/swagger';
import { Albums } from '../../albums/entities/albums.entity';
import { Tracks } from '../../tracks/entities/tracks.entity';

export class Artists {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  image: string;
  // @ApiProperty({
  //   type: () => Albums,
  //   isArray: true,
  //   required: false,
  // })
  // albums?: Albums[];
  // @ApiProperty({
  //   type: () => Tracks,
  //   isArray: true,
  //   required: false,
  // })
  // tracks?: Tracks[];
}
