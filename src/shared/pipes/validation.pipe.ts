import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '@app/shared/exception/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    if (!obj) return value;
    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map((e) => {
        return `${e.property} - ${Object.values(e.constraints).join(', ')},`;
      });
      // const messages = errors.reduce((acc, e) => {
      //   acc = {
      //     ...acc,
      //     [e.property]: Object.values(e.constraints).join(', '),
      //   };
      //   return acc;
      // }, {});
      throw new ValidationException({ errors: [...messages] });
    }
    return value;
  }
}
