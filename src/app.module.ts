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
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, TracksModule, AlbumsModule, PodcastsModule, PlaylistsModule, ArtistsModule, UsersModule],
  controllers: [AppController, ArtistsController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
