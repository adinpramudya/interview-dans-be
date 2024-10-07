import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Job } from './job/entities/job.entity';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: [User, Job],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([UserModule, JobModule]),
    UserModule,
    JobModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
