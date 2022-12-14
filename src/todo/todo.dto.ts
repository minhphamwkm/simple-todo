import { Allow, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;
  @Allow()
  description?: string;
  @Allow()
  completed: boolean;
  @Allow()
  remind_at: Date;
}
