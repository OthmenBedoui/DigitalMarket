import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: unknown, _info: unknown, _context: ExecutionContext) {
    if (err || !user) throw new UnauthorizedException('Unauthorized');
    return user;
  }
}
