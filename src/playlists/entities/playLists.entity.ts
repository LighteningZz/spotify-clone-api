import { ApiProperty } from '@nestjs/swagger';
import { PlayListItems } from '../../playListItems/entities/playListItems.entity';
import { Users } from '../../users/entities/users.entity';

export class PlayLists {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: () => PlayListItems,
    isArray: true,
    required: false,
  })
  items?: PlayListItems[];
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
  @ApiProperty({
    type: 'boolean',
  })
  public: boolean;
}
