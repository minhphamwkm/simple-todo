import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTodoDto } from 'src/todo/todo.dto';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
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
