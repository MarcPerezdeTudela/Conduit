import { User } from '../../../users/domain/models/user.entity';

export class ResponseUserFieldsDto {
  constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
    this.bio = user.bio;
    this.image = user.image;
    this.token = user.token;
  }
  email: string;
  username: string;
  token: string;
  bio: string;
  image: string;
}
export class ResponseUserDto {
  constructor(user: User) {
    this.user = new ResponseUserFieldsDto(user);
  }
  user: ResponseUserFieldsDto;
}
