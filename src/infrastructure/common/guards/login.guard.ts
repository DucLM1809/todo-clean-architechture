import { ILoginGuard } from '@app/application/common/guards/login-guard.interface';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') implements ILoginGuard {}
