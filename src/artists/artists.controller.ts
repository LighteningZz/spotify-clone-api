import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { UpdateArtistsDto } from './dto/update-artists.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Post()
  create(@Body() createArtistsDto: CreateArtistsDto) {
    return this.artistsService.create(createArtistsDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistsDto: UpdateArtistsDto) {
    return this.artistsService.update(+id, updateArtistsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove({
      id: id
    });
  }
}
