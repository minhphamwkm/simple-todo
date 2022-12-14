import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(TodoService)
    private readonly todoService: TodoService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userRepository.save(
        this.userRepository.create(createUserDto),
      );
      const todoData = new Todo();
      todoData.title = `${createUserDto.fullName}'s TODO`;
      todoData.description = `This todo has been created from user`;
      await this.todoService.createTodo(todoData);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
