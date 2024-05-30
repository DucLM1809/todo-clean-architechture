export interface IFormatExceptionMessage {
  message: string;
  statusCode?: number;
}

export abstract class IException {
  abstract badRequestException(data: IFormatExceptionMessage): void;
  abstract internalServerErrorException(data?: IFormatExceptionMessage): void;
  abstract forbiddenException(data?: IFormatExceptionMessage): void;
  abstract notFoundException(data?: IFormatExceptionMessage): void;
  abstract unauthorizedException(data?: IFormatExceptionMessage): void;
}
