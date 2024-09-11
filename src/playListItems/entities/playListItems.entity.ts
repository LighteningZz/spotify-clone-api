import { ApiProperty } from '@nestjs/swagger';
import { Tracks } from '../../tracks/entities/tracks.entity';
import { PlayLists } from '../../playLists/entities/playLists.entity';

export class PlayListItems {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: () => Tracks,
    required: false,
  })
  track?: Tracks;
  @ApiProperty({
    type: 'string',
  })
  tracksId: string;
  @ApiProperty({
    type: () => PlayLists,
    required: false,
    nullable: true,
  })
  playLists?: PlayLists | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  playListsId: string | null;
}
