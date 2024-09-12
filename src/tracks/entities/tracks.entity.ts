import { Prisma, Tracks as TracksPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Albums } from '../../albums/entities/albums.entity';
import { Artists } from '../../artists/entities/artists.entity';
import { PlayListItems } from '../../playListItems/entities/playListItems.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

export class Tracks implements TracksPrisma {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: () => Albums,
    required: false,
  })
  album?: Albums;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  image: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
    nullable: true,
  })
  duration: number | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  durationText: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  url: string | null;
  @ApiProperty({
    type: 'string',
  })
  albumId: string;
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
    type: () => PlayListItems,
    isArray: true,
    required: false,
  })
  playListItems?: PlayListItems[];
  @ApiProperty({
    type: () => Favorite,
    isArray: true,
    required: false,
  })
  Favorite?: Favorite[];
}
