import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
