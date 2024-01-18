import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // now config is available in the entire app, no need to import in each module
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true, // keep database schema synchronized
    }),
  ],
})
export class AppModule {}
