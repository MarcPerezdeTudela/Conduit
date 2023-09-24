import { User } from '@prisma/client';
export class UserSchema implements User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  id: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
