import { User } from '../models/user.entity';
export const IUsersRepositoryToken = Symbol('IUsersRepository');
export interface IUsersRepository {
  create(user: User): Promise<User>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneByUsername(username: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
}
