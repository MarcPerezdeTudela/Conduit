import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../application/dto';
import { User } from '../../../users/domain/models/user.entity';

@Controller('users')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: User })
  async login(@Body() { user }: LoginDto) {
    const { email, password } = user;
    return await this.authService.login(email, password);
  }
}
