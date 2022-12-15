import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { verifyPassword } from '../common/helper/hash';

@Injectable()
export class AuthService {
  constructor(@InjectDataSource() private readonly connector: DataSource) {}

  private readonly queryRunner = this.connector.createQueryRunner();

  async getAuthenticatedUser(authData: AuthDto) {
    try {
      const user = await this.connector
        .createQueryBuilder()
        .select('user.username')
        .addSelect('user.password')
        .from(UserEntity, 'user')
        .where('user.username = :username', { username: authData.username })
        .getOne();
      if (!user) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPasswordMatching = await verifyPassword(
        authData.password,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
