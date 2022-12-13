import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PostgresConfigService } from './common/database/postgres.connector';
import { TypeOrmModule } from '@nestjs/typeorm';

const envFilePath = `.env`;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
