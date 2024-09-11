import { Injectable } from '@nestjs/common';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { UpdateArtistsDto } from './dto/update-artists.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Artists } from './entities/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) { }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArtistsWhereUniqueInput;
    where?: Prisma.ArtistsWhereInput;
    orderBy?: Prisma.ArtistsOrderByWithRelationInput;
  }): Promise<Artists[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.prisma.artists.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { albums: true },
        },
      }
    });
  }
  async findOne(where: Prisma.ArtistsWhereUniqueInput): Promise<Artists> {
    return await this.prisma.artists.findUnique({
      where: where
    });
  }


}
