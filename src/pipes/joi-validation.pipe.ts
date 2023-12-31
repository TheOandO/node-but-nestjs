import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.Schema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed: ' + error.details[0].message);
        }
        return value;
    }
}
