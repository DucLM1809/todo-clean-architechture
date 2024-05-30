import { ILoginGuard } from '@app/application/common/guards/login-guard.interface';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard
  extends AuthGuard('jwt-refresh-token')
  implements ILoginGuard {}
