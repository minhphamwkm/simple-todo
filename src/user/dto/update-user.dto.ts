import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  username: string;
  @IsOptional()
  password: string;
  @IsOptional()
  email: string;
  @IsOptional()
  fullName: string;
}
