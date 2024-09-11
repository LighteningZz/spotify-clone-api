import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthsDto } from './dto/create-auths.dto';
import { LoginAuthsDto } from './dto/login-auths.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Users } from 'src/users/entities/users.entity';
import { AccessTokenAuthsDto } from './dto/access-token-auth.dto';
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateAuthsDto) {
    return await this.authService.signUp({
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name
    });
  }

  @Post('signin')
  @ApiResponse({ status: 200, type: AccessTokenAuthsDto })
  async signIn(@Body() loginUserDto: LoginAuthsDto) {
    return await this.authService.signIn(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: Users })
  @Get('profile')
  getProfile(@Request() req) {
    return plainToInstance(Users, req.user);
  }
}
