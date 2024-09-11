import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthsDto } from './dto/create-auths.dto';
import { LoginAuthsDto } from './dto/login-auths.dto';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AccessTokenAuthsDto } from './dto/access-token-auth.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) { }

  async signUp(createUserDto: Prisma.UsersCreateInput): Promise<AccessTokenAuthsDto> {
    const { password } = createUserDto;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword
    });
    return this.generateToken(user);
  }

  async signIn(loginUserDto: LoginAuthsDto): Promise<AccessTokenAuthsDto> {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException('Email or Password Incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Email or Password Incorrect.');
    }

    return this.generateToken(user);

  }

  private generateToken(user): AccessTokenAuthsDto {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}