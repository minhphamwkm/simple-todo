import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as request from 'supertest';
import { UserModule } from './user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const configService = new ConfigService();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: 'postgres',
          password: 'postgres',
          database: 'todo-test',
          entities: ['src/**/*.entity.{ts,js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /users: Response is created users', async () => {
    const newUserParams = {
      username: 'dto.username',
      password: 'dto.password',
    };
    const result = await request(app.getHttpServer())
      .post('/users')
      .send(newUserParams);
    expect(result.status).toBe(201);
  });
});
