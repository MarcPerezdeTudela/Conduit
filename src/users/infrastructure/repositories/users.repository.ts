import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../../users/domain/ports/IUsersRepository';
import { User } from '../../../users/domain/models/user.entity';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserSchema } from '../../../prisma/schemas/user.schema';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}
  async create(user: User): Promise<User> {
    const userData = new UserSchema(user);
    return new User(await this.prismaService.user.create({ data: userData }));
  }

  async findOne(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { username } });
  }

  async update(id: string, user: User): Promise<User> {
    const userData = new UserSchema(user);
    return await this.prismaService.user.update({
      where: { id },
      data: userData,
    });
  }
}
