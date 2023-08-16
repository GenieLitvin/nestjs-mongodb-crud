import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly userService: string;
  private readonly password: string;

  constructor(private readonly configService: ConfigService) {
    this.userService = configService.get<string>('SERVICE_USER');
    this.password = configService.get<string>('SERVICE_PASSWORD');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [username, password] = this.extractCredentialsFromHeader(request);
    if (!username || !password) {
      throw new UnauthorizedException();
    }
    if (username !== this.userService || password !== this.password) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractCredentialsFromHeader(
    request: Request,
  ): [string, string] | undefined {
    const data = request.headers.authorization?.split(' ') ?? [];
    const [type, credentialsstring] = data;
    if (type !== 'Basic') return [undefined, undefined];
    const credentials = Buffer.from(credentialsstring, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');
    return [username, password];
  }
}
