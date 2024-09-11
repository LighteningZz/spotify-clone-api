import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client'

export class TracksOrderbyInputDto implements Prisma.TracksOrderByWithRelationInput {
    @ApiProperty()
    album?: Prisma.AlbumsOrderByWithRelationInput = {
        name: 'asc',
    };
    artist?: Prisma.ArtistsOrderByWithRelationInput;
    artistsId?: Prisma.SortOrder;
    duration?: Prisma.SortOrder | Prisma.SortOrderInput;
    durationText?: Prisma.SortOrder | Prisma.SortOrderInput;
    id?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
}