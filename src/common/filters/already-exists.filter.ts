import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AlreadyExistsError } from '../errors/already-exists.error';
import { Response } from 'express';

@Catch(AlreadyExistsError)
export class AlreadyExistsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
    });
  }
}
