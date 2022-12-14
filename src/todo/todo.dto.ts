import { Allow, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;
  @Allow()
  description?: string;
  @Allow()
  completed: boolean;
  @Allow()
  remind_at: Date;
}
