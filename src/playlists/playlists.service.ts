import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PlayLists } from './entities/playLists.entity';

@Injectable()
export class PlaylistsService {
    constructor(private prisma: PrismaService) { }

    async create(user: Prisma.PlayListsCreateInput): Promise<PlayLists> {
        return this.prisma.playLists.create({
            data: {
                ...user
            }
        });

    }

    async findOne(where: Prisma.PlayListsWhereUniqueInput): Promise<PlayLists> {
        return await this.prisma.playLists.findUnique({
            where: where
        });
    }



}
