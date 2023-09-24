import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import dbConfig from './config/database.config';
import { envSchema } from './env.schema';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      validationSchema: envSchema,
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
