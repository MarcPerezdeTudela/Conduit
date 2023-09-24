import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameValidation implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: string): Promise<boolean> {
    const usernameFound = await this.usersRepository.findOneByUsername(value);
    if (usernameFound) return false;
    else return true;
  }

  defaultMessage(): string {
    return 'Username $value already exists. Choose another username.';
  }
}
