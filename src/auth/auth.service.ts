import { Injectable } from '@nestjs/common';
import { CreateAuthsDto } from './dto/create-auths.dto';
import { UpdateAuthsDto } from './dto/update-auths.dto';

@Injectable()
export class AuthService {
  create(createAuthsDto: CreateAuthsDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthsDto: UpdateAuthsDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
