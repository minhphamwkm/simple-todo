import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodo() {
    return this.todoService.getAllTodo();
  }

  @Get(':id')
  getDetailTodoItem(@Param('id') id: number) {
    return this.todoService.getDetailTodoItem(+id);
  }

  @Post()
  createTodo(@Body() todoItem: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(todoItem);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: number,
    @Body() todoItem: UpdateTodoDto,
    @Body('description') description: string,
  ) {
    console.log(description);
    return this.todoService.updateTodo(+id, todoItem);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(+id);
  }

  @Delete()
  deleteAllTodo() {
    return this.todoService.deleteAllTodo();
  }
}
