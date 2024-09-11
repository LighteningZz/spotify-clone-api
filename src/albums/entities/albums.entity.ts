import { ApiProperty } from '@nestjs/swagger';
import { Artists } from '../../artists/entities/artists.entity';
import { Tracks } from '../../tracks/entities/tracks.entity';

export class Albums {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: () => Artists,
    required: false,
  })
  artist?: Artists;
  @ApiProperty({
    type: 'string',
  })
  artistsId: string;
  @ApiProperty({
    type: 'string',
  })
  image: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: () => Tracks,
    isArray: true,
    required: false,
  })
  tracks?: Tracks[];
}
