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

@Controller('users/:userId/todos')
@ApiTags('TodoService')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodo(@Param('userId') userId: number) {
    return await this.todoService.getAllTodo(+userId);
  }

  @Get(':id')
  async getDetailTodoItem(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.todoService.getDetailTodoItem(+userId, +id);
  }

  @Post()
  async createTodo(
    @Param('userId') userId: number,
    @Body() todoItem: CreateTodoDto,
  ) {
    return await this.todoService.createTodo(+userId, todoItem);
  }

  @Put(':id')
  async updateTodo(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() todoItem: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(+userId, +id, todoItem);
  }

  @Delete(':id')
  async deleteTodo(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.todoService.deleteTodo(+userId, +id);
  }

  @Delete()
  async deleteAllTodo(@Param('userId') userId: number) {
    return await this.todoService.deleteAllTodo(+userId);
  }
}
