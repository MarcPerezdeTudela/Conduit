import { User } from '../../../users/domain/models/user.entity';

export const IAuthRepositoryToken = Symbol('IAuthRepository');
export interface IAuthRepository {
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
}
