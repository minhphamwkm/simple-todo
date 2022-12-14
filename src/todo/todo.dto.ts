import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  completed: boolean;
  @IsOptional()
  remind_at: Date;
}
