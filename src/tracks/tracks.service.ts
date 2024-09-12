import { Injectable } from '@nestjs/common';
import { CreateTracksDto } from './dto/create-tracks.dto';
import { UpdateTracksDto } from './dto/update-tracks.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TracksDto } from './dto/tracks.dto';
import { plainToInstance, classToPlain } from 'class-transformer';
import { Prisma, Tracks } from '@prisma/client';
@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) { }




  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TracksWhereUniqueInput;
    where?: Prisma.TracksWhereInput;
    orderBy?: Prisma.TracksOrderByWithRelationInput;
  }): Promise<Tracks[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.prisma.tracks.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { playListItems: true },
        },
        artist: true,
        Favorite: true
      },
    });
  }


  async findOne(tracksWhereUniqueInput: Prisma.TracksWhereUniqueInput): Promise<Tracks> {
    return await this.prisma.tracks.findUnique({
      where: tracksWhereUniqueInput,
      include: {
        album: true,
        artist: true,
      }
    });
  }


}
