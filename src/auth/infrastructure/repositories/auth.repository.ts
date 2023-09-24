import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IAuthRepository } from '../../domain/ports/IAuthRepository';
import { User } from '../../../users/domain/models/user.entity';
@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: string) {
    const user = new User(
      await this.prismaService.user.findUnique({
        where: { id: id },
      }),
    );
    return user;
  }

  async findOneByEmail(email: string) {
    const user = new User(
      await this.prismaService.user.findUnique({
        where: { email: email },
      }),
    );
    return user;
  }
}
