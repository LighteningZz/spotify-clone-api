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
import { ArtistsService } from './artists.service';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { UpdateArtistsDto } from './dto/update-artists.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }


  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('cursor') cursor?: string,
    @Query('search') search?: string,
  ) {
    return this.artistsService.findAll({
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne({ id: id });
  }

}
