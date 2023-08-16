import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function OptionsArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'optionsArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          const hasCorrectOption = value.some(
            (option) => option.isCorrect === true,
          );
          const correctOptionsCount = value.filter(
            (option) => option.isCorrect === true,
          ).length;
          return hasCorrectOption && correctOptionsCount === 1;
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} array must contain objects with option only one object with isCorrect set to true.`;
        },
      },
    });
  };
}
