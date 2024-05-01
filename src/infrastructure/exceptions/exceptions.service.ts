import {
  IException,
  IFormatExceptionMessage,
} from '@app/application/todo/exceptions/exceptions.interface';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data.message);
  }

  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data.message);
  }

  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data.message);
  }

  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data.message);
  }

  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data.message);
  }
}
