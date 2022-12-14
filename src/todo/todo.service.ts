import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  @InjectDataSource() private readonly todoDataSource: DataSource;

  async getAllTodo() {
    return await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .select('todo')
      .getMany();
  }

  async getDetailTodoItem(id: number) {
    return await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .select('todo')
      .where('id=:id', { id: id })
      .getOne();
  }

  async createTodo(todoItem: CreateTodoDto) {
    const createdTodo = await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .insert()
      .into(TodoEntity)
      .values(todoItem)
      .execute();
    return this.getDetailTodoItem(createdTodo.identifiers[0].id);
  }

  async updateTodo(id: number, todoItem: UpdateTodoDto) {
    await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .update(TodoEntity)
      .set(todoItem)
      .where('id=:id', { id: id })
      .execute();
    return await this.getDetailTodoItem(id);
  }

  async deleteTodo(id: number) {
    await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .delete()
      .where('id=:id', { id: id })
      .execute();
    return `Todo Deleted`;
  }

  async deleteAllTodo() {
    await this.todoDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .delete()
      .execute();
    return `All Todo deleted`;
  }
}
