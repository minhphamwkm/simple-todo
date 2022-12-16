import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { TodoService } from '../todo/todo.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(TodoService)
    private readonly todoService: TodoService,
    @InjectDataSource() private readonly connector: DataSource,
  ) {}

  private readonly queryRunner = this.connector.createQueryRunner();

  async create(createUserData: CreateUserDto) {
    try {
      const passwordInPlaintext = createUserData.password;
      const hashedPassword = await bcrypt.hash(passwordInPlaintext, 10);
      createUserData.password = hashedPassword;
      const createdUser = await this.queryRunner.manager.insert(
        UserEntity,
        createUserData,
      );
      const todoData = new TodoEntity();
      todoData.title = `${createUserData.fullName}'s TODO`;
      todoData.description = `This todo has been created from user`;
      await this.todoService.createTodo(todoData);
      return this.findOne(createdUser.identifiers[0].id);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.queryRunner.manager.find(UserEntity);
  }

  async findOne(id: number) {
    return await this.queryRunner.manager.findOneBy(UserEntity, { id: id });
  }

  async update(id: number, updateUserData: UpdateUserDto) {
    try {
      await this.queryRunner.manager.update(UserEntity, id, updateUserData);
      return await this.findOne(id);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      await this.queryRunner.manager.delete(UserEntity, id);
      return `Todo Deleted`;
    } catch (error) {
      return error;
    }
  }
}
