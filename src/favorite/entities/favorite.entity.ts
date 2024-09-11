import { ApiProperty } from '@nestjs/swagger';
import { Tracks } from '../../tracks/entities/tracks.entity';
import { Users } from '../../users/entities/users.entity';

export class Favorite {
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
    type: () => Users,
    required: false,
    nullable: true,
  })
  Users?: Users | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  usersId: string | null;
}
