import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { AuthService } from '../../auth/application/auth.service';
import {
  IUsersRepository,
  IUsersRepositoryToken,
} from '../domain/ports/IUsersRepository';
import { User } from '../domain/models/user.entity';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;
@Injectable()
export class UsersService implements UsersService {
  constructor(
    @Inject(IUsersRepositoryToken) private usersRepository: IUsersRepository,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userToCreate = new User(createUserDto.user);
    const { password } = createUserDto.user;
    const hashedPassword = await bcrypt.hash(
      userToCreate.password,
      roundsOfHashing,
    );
    userToCreate.password = hashedPassword;
    await this.usersRepository.create(userToCreate);
    const loggedUser = await this.authService.login(
      userToCreate.email,
      password,
    );
    return loggedUser;
  }
  async findOne(id: string) {
    return new ResponseUserDto(await this.usersRepository.findOne(id));
  }
  async findOneByEmail(email: string) {
    return new ResponseUserDto(
      await this.usersRepository.findOneByEmail(email),
    );
  }
  async findOneByUsername(username: string) {
    return new ResponseUserDto(
      await this.usersRepository.findOneByUsername(username),
    );
  }
  async update(id: string, token: string, updateUserDto: UpdateUserDto) {
    const user = new User(updateUserDto.user);
    if (user.password) {
      user.password = await bcrypt.hash(user.password, roundsOfHashing);
    }
    const responseUserDto = new ResponseUserDto(
      await this.usersRepository.update(id, user),
    );
    responseUserDto.user.token = token;
    return responseUserDto;
  }
}
