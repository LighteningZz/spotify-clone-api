import { Injectable } from '@nestjs/common';
import { CreateTracksDto } from './dto/create-tracks.dto';
import { UpdateTracksDto } from './dto/update-tracks.dto';

@Injectable()
export class TracksService {
  create(createTracksDto: CreateTracksDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return `This action returns all tracks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTracksDto: UpdateTracksDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
