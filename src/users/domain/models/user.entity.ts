export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  id: string;
  email: string;
  username: string;
  password: string;
  token?: string;
  bio?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
