import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectDataSource() private readonly connector: DataSource) {}
  private readonly queryRunner = this.connector.createQueryRunner();

  async getAllTodo(userId: number) {
    return await this.queryRunner.manager.findBy(TodoEntity, {
      owner_id: userId,
    });
  }

  async getDetailTodoItem(userId: number, id: number) {
    return await this.queryRunner.manager.findOneBy(TodoEntity, {
      id: id,
      owner_id: userId,
    });
  }

  async createTodo(userId: number, todoItem: CreateTodoDto) {
    const createdTodo = await this.queryRunner.manager.insert(
      TodoEntity,
      todoItem,
    );
    return this.getDetailTodoItem(userId, createdTodo.identifiers[0].id);
  }

  async updateTodo(userId: number, id: number, todoItem: UpdateTodoDto) {
    await this.queryRunner.manager.update(TodoEntity, id, todoItem);
    return await this.getDetailTodoItem(userId, id);
  }

  async deleteTodo(userId: number, id: number) {
    await this.queryRunner.manager.delete(TodoEntity, {
      owner_id: userId,
      id: id,
    });
    return `Todo Deleted`;
  }

  async deleteAllTodo(userId: number) {
    const all_todo = await this.queryRunner.manager.find(TodoEntity);
    await this.queryRunner.manager.delete(
      TodoEntity,
      all_todo.map(({ id }) => id),
    );
    return `All Todo deleted`;
  }
}
