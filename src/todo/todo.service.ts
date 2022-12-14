import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  async getAllTodo() {
    return await this.repository.find();
  }

  async getDetailTodoItem(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async createTodo(todoItem: CreateTodoDto) {
    return await this.repository.save(this.repository.create(todoItem));
  }

  async updateTodo(id: number, todoItem: UpdateTodoDto) {
    return await this.repository.update(id, todoItem);
  }

  async deleteTodo(id: number) {
    return await this.repository.delete({ id: id });
  }

  async deleteAllTodo() {
    const all_todo = await this.repository.find();
    return await this.repository.delete(all_todo.map(({ id }) => id));
  }
}
