import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { ConvertTextToUpperCase } from 'src/utils/utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      throw new ForbiddenException('You dont have role any role');
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      const payloadRole = ConvertTextToUpperCase.toUpperCaseWithUnderscore(
        payload.userType,
      );
      if (!requiredRoles.includes(payloadRole)) {
        throw new UnauthorizedException('You do not have role required');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('You do not have role required');
    }
  }
}
