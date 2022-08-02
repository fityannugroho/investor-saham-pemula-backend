import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { urlAlphabet } from 'nanoid';

export function IsNanoid(
  length: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [length],
      options: Object.assign(
        {
          message: '$property must be $constraint1 characters of nanoid.',
        },
        validationOptions,
      ),
      validator: IsNanoidConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isNanoid' })
export class IsNanoidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [length] = args.constraints as [number, any];

    return (
      typeof value === 'string' &&
      value.length === length &&
      [...value].every((char) => urlAlphabet.includes(char))
    );
  }
}
