import { PartialType } from '@nestjs/swagger';
import { CreateAuthsDto } from './create-auths.dto';

export class UpdateAuthsDto extends PartialType(CreateAuthsDto) {}
