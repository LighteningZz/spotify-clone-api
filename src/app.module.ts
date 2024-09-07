import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { PodcastsModule } from './podcasts/podcasts.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [AuthModule, TracksModule, AlbumsModule, PodcastsModule, PlaylistsModule, ArtistsModule],
  controllers: [AppController, ArtistsController],
  providers: [AppService],
})
export class AppModule {}
