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
import { ApiTags } from '@nestjs/swagger';

@Controller('todos')
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
  async createTodo(@Body() todoItem: CreateTodoDto) {
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
