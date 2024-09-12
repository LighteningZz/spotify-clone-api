import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTracksDto } from './dto/create-tracks.dto';
import { UpdateTracksDto } from './dto/update-tracks.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { TracksOrderbyInputDto } from './dto/tracks-orderby-input.dto';
import { TracksWithCount } from './entities/tracks-with-count.entity';
import { Tracks } from './entities/tracks.entity';
import { plainToInstance } from 'class-transformer';


@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findAll(
    @Query('cursor') cursor?: string,
    @Query('search') search?: string,
  ): Promise<Tracks[]> {
    const data = await this.tracksService.findAll({
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

    return data;
  }

  @ApiQuery({ name: 'id', description: 'album Id' })
  @Get('album/:id')
  async findByAlbum(@Query('id') id: string): Promise<Tracks[]> {
    const data = await this.tracksService.findAll({
      where: {
        albumId: id
      },
      orderBy: {
        album: {
          tracks: {
            _count: 'desc'
          }
        }
      }
    });

    return data;
  }
  @ApiQuery({ name: 'id', description: 'artist Id' })
  @Get('artist/:id')
  async findByArtist(@Query('id') id: string): Promise<Tracks[]> {
    const data = await this.tracksService.findAll({
      where: {
        artistsId: id
      },
      orderBy: {
        album: {
          tracks: {
            _count: 'desc'
          }
        }
      }
    });

    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne({ id: id });
  }

}
