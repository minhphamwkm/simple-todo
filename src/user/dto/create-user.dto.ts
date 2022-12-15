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
  @IsEmail()
  email: string;
  @IsNotEmpty()
  fullName: string;
  @IsOptional()
  dateOfBirth: Date;
  @IsOptional()
  gender: string;
}
