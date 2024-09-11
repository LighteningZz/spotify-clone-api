import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTracksDto } from './dto/create-tracks.dto';
import { UpdateTracksDto } from './dto/update-tracks.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma, Tracks } from '@prisma/client';
import { TracksOrderbyInputDto } from './dto/tracks-orderby-input.dto';
import { TracksWithCount } from './entities/tracks-with-count.entity';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('cursor') cursor?: string,
    @Query('search') search?: string,
  ) {
    return this.tracksService.findAll({
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            }
          },
          {
            album: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
          },
          {
            artist: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne({ id: id });
  }

}
