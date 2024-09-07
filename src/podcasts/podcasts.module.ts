import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsController } from './podcasts.controller';

@Module({
  providers: [PodcastsService],
  controllers: [PodcastsController]
})
export class PodcastsModule {}
