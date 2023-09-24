import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidation implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: string): Promise<boolean> {
    const emailFound = await this.usersRepository.findOneByEmail(value);
    if (emailFound) return false;
    else return true;
  }

  defaultMessage(): string {
    return 'Email $value already exists. Choose another email.';
  }
}
