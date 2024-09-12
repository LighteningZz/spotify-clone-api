import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('cursor') cursor?: string,
    @Query('search') search?: string,
  ) {
    return this.albumsService.findAll({
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: {
        tracks: {
          _count: 'desc'
        }
      }
    });
  }
  @ApiQuery({ name: 'id', description: 'artist Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne({ artistsId: id });
  }
}
