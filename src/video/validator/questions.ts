import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function AnswersArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'answersArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          const hasCorrectAnswer = value.some(
            (question) => question.answer === true,
          );
          const correctAnswerCount = value.filter(
            (question) => question.answer === true,
          ).length;
          return hasCorrectAnswer && correctAnswerCount === 1;
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} array must contain objects with question only one object with 'answer' set to true.`;
        },
      },
    });
  };
}
