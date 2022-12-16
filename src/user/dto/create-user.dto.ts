import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  fullName: string;
  @IsOptional()
  dateOfBirth: Date;
  @IsOptional()
  gender: string;
}
