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
import { Todo } from '../entities/todo.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('TodoService')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodo() {
    return await this.todoService.getAllTodo();
  }

  @Get(':id')
  async getDetailTodoItem(@Param('id') id: number) {
    return await this.todoService.getDetailTodoItem(+id);
  }

  @Post()
  async createTodo(@Body() todoItem: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(todoItem);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todoItem: UpdateTodoDto) {
    return await this.todoService.updateTodo(+id, todoItem);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return await this.todoService.deleteTodo(+id);
  }

  @Delete()
  async deleteAllTodo() {
    return await this.todoService.deleteAllTodo();
  }
}
