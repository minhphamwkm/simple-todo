import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from 'src/todo/todo.service';
import { TodoEntity } from 'src/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TodoEntity])],
  controllers: [UserController],
  providers: [UserService, TodoService],
})
export class UserModule {}
