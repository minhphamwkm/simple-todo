import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectDataSource() private readonly connector: DataSource) {}
  private readonly queryRunner = this.connector.createQueryRunner();

  async getAllTodo() {
    return await this.queryRunner.manager.find(TodoEntity);
  }

  async getDetailTodoItem(id: number) {
    return await this.queryRunner.manager.findOneBy(TodoEntity, { id: id });
  }

  async createTodo(todoItem: CreateTodoDto) {
    const createdTodo = await this.queryRunner.manager.insert(
      TodoEntity,
      todoItem,
    );
    return this.getDetailTodoItem(createdTodo.identifiers[0].id);
  }

  async updateTodo(id: number, todoItem: UpdateTodoDto) {
    await this.queryRunner.manager.update(TodoEntity, id, todoItem);
    return await this.getDetailTodoItem(id);
  }

  async deleteTodo(id: number) {
    await this.queryRunner.manager.delete(TodoEntity, id);
    return `Todo Deleted`;
  }

  async deleteAllTodo() {
    const all_todo = await this.queryRunner.manager.find(TodoEntity);
    await this.queryRunner.manager.delete(
      TodoEntity,
      all_todo.map(({ id }) => id),
    );
    return `All Todo deleted`;
  }
}
