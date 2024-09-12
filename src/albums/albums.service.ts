import { Injectable } from '@nestjs/common';
import { CreateAlbumsDto } from './dto/create-albums.dto';
import { UpdateAlbumsDto } from './dto/update-albums.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Albums } from './entities/albums.entity';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) { }
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AlbumsWhereUniqueInput;
    where?: Prisma.AlbumsWhereInput;
    orderBy?: Prisma.AlbumsOrderByWithRelationInput;
  }): Promise<Albums[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.prisma.albums.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { tracks: true },
        },
      }
    });
  }
  async findOne(where: Prisma.AlbumsWhereInput): Promise<Albums> {
    return await this.prisma.albums.findFirst({
      where: where
    });
  }

}
