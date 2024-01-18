import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // now config is available in the entire app, no need to import in each module
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    // this is ASYNC - waiting for configModule to be initialized
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // keep database schema synchronized
      }),
    }),
    // TypeOrmModule.forRoot({
    //   // type: 'postgres',
    //   // host: 'localhost',
    //   // port: 5432,
    //   // username: 'postgres',
    //   // password: 'postgres',
    //   // database: 'task-management',
    //   autoLoadEntities: true,
    //   synchronize: true, // keep database schema synchronized
    // }),
  ],
})
export class AppModule {}
