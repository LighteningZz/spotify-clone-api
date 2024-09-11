import { Prisma } from '@prisma/client';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Albums } from '../../albums/entities/albums.entity';
import { Artists } from '../../artists/entities/artists.entity';
import { PlayListItems } from '../../playListItems/entities/playListItems.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Tracks } from './tracks.entity';

export class TracksWithCount extends Tracks {
  @ApiHideProperty()
  artist?: null;
  @ApiHideProperty()
  Favorite?: Favorite[];
  @ApiHideProperty()
  album?: null;
  @ApiProperty()
  _count: Partial<Record<keyof PlayListItems, number>>

}
