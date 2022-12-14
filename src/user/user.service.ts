import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';
import { TodoEntity } from 'src/entities/todo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(TodoService)
    private readonly todoService: TodoService,
    @InjectDataSource() private readonly userDataSource: DataSource,
  ) {}

  async create(createUserData: CreateUserDto) {
    try {
      const createdUser = await this.userDataSource
        .getRepository(TodoEntity)
        .createQueryBuilder('todo')
        .insert()
        .into(UserEntity)
        .values(createUserData)
        .execute();
      const todoData = new TodoEntity();
      todoData.title = `${createUserData.fullName}'s TODO`;
      todoData.description = `This todo has been created from user`;
      await this.todoService.createTodo(todoData);
      return this.findOne(createdUser.identifiers[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.userDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('todo')
      .select('todo')
      .getMany();
  }

  async findOne(id: number) {
    return await this.userDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('todo')
      .select('todo')
      .where('id=:id', { id: id })
      .getOne();
  }

  async update(id: number, updateUserData: UpdateUserDto) {
    await this.userDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('todo')
      .update(UserEntity)
      .set(updateUserData)
      .where('id=:id', { id: id })
      .execute();
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.userDataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .delete()
      .where('id=:id', { id: id })
      .execute();
    return `Todo Deleted`;
  }
}
