import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/jwt/jwt.strategy';
import { IAuthRepositoryToken } from './domain/ports/IAuthRepository';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthRepository,
    { provide: IAuthRepositoryToken, useExisting: AuthRepository },
  ],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
