import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  async getAllTodo() {
    return this.repository.find();
  }

  async getDetailTodoItem(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  async createTodo(todoItem: CreateTodoDto) {
    const todo: Todo = new Todo();
    todo.title = todoItem.title;

    return this.repository.save(todo);
  }

  async updateTodo(id: number, todoItem: UpdateTodoDto) {
    const todo = await this.repository.findOneBy({ id: id });
    const tmp = await this.repository.update(todo.id, todoItem);
    console.log('🚀 ~ file: todo.service.ts:30 ~ TodoService ~ tmp', tmp);
    const tmp_result = await this.repository.findOneBy({ id: id });
    console.log(
      '🚀 ~ file: todo.service.ts:32 ~ TodoService ~ todoItem',
      todoItem,
    );
    return tmp_result;
    // todo.title = todoItem.title;
    // return this.repository.save(todo);
  }

  async deleteTodo(id: number) {
    return this.repository.delete({ id: id });
  }

  async deleteAllTodo() {
    const all_todo = await this.repository.find();
    console.log(
      '🚀 ~ file: todo.service.ts:39 ~ TodoService ~ all_todo',
      all_todo,
    );
    return null;
    // return this.repository.delete(all_todo);
  }
}
