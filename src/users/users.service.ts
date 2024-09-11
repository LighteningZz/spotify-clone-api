import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(user: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({
      data: {
        ...user
      }
    });

  }

  async findOne(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return await this.prisma.users.findUnique({
      where: where
    });
  }

  async findOneByEmail(email: string): Promise<Users> {

    return await this.findOne({
      email: email
    });
  }
}
