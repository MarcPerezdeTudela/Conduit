import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEmailUnique, IsUsernameUnique } from '../decorators';

export class UpdateUserFieldsDto {
  @IsOptional()
  @IsString()
  @IsUsernameUnique()
  username: string;
  @IsOptional()
  @IsEmail()
  @IsEmailUnique()
  email: string;
  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;
  @IsOptional()
  @IsString()
  bio: string;
  @IsOptional()
  @IsString()
  image: string;
}
export class UpdateUserDto {
  @Type(() => UpdateUserFieldsDto)
  @ValidateNested()
  user: UpdateUserFieldsDto;
}
