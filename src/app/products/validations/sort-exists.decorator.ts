import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'SortExists', async: true })
@Injectable()
export class SortExistsRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    const list: string[] = ['id', 'name', 'sku', 'price', 'createdAt'];
    const cleanValue = value.charAt(0) === '-' ? value.substring(1) : value;
    if (list.includes(cleanValue)) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} isn't compatible in ${args.property}`;
  }
}

export function SortExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'SortExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: SortExistsRule,
    });
  };
}
