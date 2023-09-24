import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueEmailValidation } from '../validators';

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidation,
    });
  };
}
