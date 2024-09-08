import { Injectable } from '@nestjs/common';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { UpdateArtistsDto } from './dto/update-artists.dto';
import { Artists, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) { }
  create(createArtistsDto: CreateArtistsDto) {
    return 'This action adds a new artist';
  }

  findAll() {
    return `This action returns all artists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistsDto: UpdateArtistsDto) {
    return `This action updates a #${id} artist`;
  }

  remove(where: Prisma.ArtistsWhereUniqueInput): Promise<Artists> {
    return this.prisma.artists.delete({
      where,
    });
  }
}
