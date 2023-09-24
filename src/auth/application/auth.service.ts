import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthRepository,
  IAuthRepositoryToken,
} from '../domain/ports/IAuthRepository';
import { ResponseUserDto } from '../../users/application/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(IAuthRepositoryToken) private authRepository: IAuthRepository,
  ) {}

  async login(email: string, password: string): Promise<ResponseUserDto> {
    const user = await this.authRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ userId: user.id });
    user.token = token;
    return new ResponseUserDto(user);
  }
}
