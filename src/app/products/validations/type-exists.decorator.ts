import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'TypeExists', async: true })
@Injectable()
export class TypeExistsRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    const list: string[] = ['name', 'sku'];
    if (list.includes(value)) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} isn't compatible in ${args.property}`;
  }
}

export function TypeExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'TypeExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TypeExistsRule,
    });
  };
}
