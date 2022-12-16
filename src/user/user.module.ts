import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from '../todo/todo.service';
import { TodoEntity } from '../entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TodoEntity])],
  controllers: [UserController],
  providers: [UserService, TodoService],
})
export class UserModule {}
