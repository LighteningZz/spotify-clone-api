import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { PlayLists } from '../../playLists/entities/playLists.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Exclude } from 'class-transformer';

export class Users {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  image: string | null;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @Exclude()
  @ApiHideProperty()
  PlayLists?: PlayLists[];

  @Exclude()
  @ApiHideProperty()
  Favorite?: Favorite[];
}
