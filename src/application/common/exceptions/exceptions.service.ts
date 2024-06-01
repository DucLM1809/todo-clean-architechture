import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

interface IFormatExceptionMessage {
  message: string;
  statusCode?: number;
}

@Injectable()
export class ExceptionsService {
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
