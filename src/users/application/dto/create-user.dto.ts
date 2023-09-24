import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsEmailUnique, IsUsernameUnique } from '../decorators';
import { Type } from 'class-transformer';

export class CreateUserFieldsDto {
  @IsNotEmpty()
  @IsString()
  @IsUsernameUnique()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
export class CreateUserDto {
  @Type(() => CreateUserFieldsDto)
  @ValidateNested()
  user: CreateUserFieldsDto;
}
