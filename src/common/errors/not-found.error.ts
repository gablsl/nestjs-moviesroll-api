import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class NotFoundError extends PrismaClientKnownRequestError {
  constructor(entity: string) {
    super(`${entity} was not found`, null);
  }
}
