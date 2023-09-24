import { UsersService } from '../../application/users.service';
import { UseGuards, Controller, Post, Body, Get, Put } from '@nestjs/common';

import {
  CreateUserDto,
  ResponseUserDto,
  UpdateUserDto,
} from '../../application/dto';
import { CurrentUser } from '../../application/decorators';
import { JwtAuthGuard } from '../../../auth/application/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('users')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('user')
  @ApiOkResponse({ type: ResponseUserDto })
  getCurrentUser(@CurrentUser() responseUserDto: ResponseUserDto) {
    return responseUserDto;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('user')
  @ApiOkResponse({ type: ResponseUserDto })
  async updateCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser('id') id: string,
    @CurrentUser('token') token: string,
  ) {
    return await this.usersService.update(id, token, updateUserDto);
  }
}
