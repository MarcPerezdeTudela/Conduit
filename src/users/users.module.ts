import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { UsersController } from './infrastructure/controllers/users.controller';
import {
  UniqueEmailValidation,
  UniqueUsernameValidation,
} from './application/validators';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { IUsersRepositoryToken } from './domain/ports/IUsersRepository';

@Module({
  imports: [PrismaModule, PassportModule, forwardRef(() => AuthModule)],
  providers: [
    UsersService,
    UsersRepository,
    { provide: IUsersRepositoryToken, useClass: UsersRepository },
    UniqueEmailValidation,
    UniqueUsernameValidation,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
