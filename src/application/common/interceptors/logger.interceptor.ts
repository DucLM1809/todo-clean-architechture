import { ILogger } from '@app/application/common/logger/logger.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ILogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIp(request);

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method} ip=${ip}`,
    );

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `End Request for  ${request.path}`,
            `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
          ),
        ),
      );
  }

  private getIp(request: any): string {
    let ip: string;

    const ipAddr = request.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }

    return ip.replace('::ffff:', '');
  }
}
