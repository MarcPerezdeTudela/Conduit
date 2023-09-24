import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueUsernameValidation } from '../validators/';

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUsernameValidation,
    });
  };
}
