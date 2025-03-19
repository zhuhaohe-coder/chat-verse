import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

export interface JwtPayload {
  userId: string;
  username: string;
  iat: number; // token 签发时间
  exp: number; // token 过期时间
}

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const requiredAuth = this.reflector.getAllAndOverride<boolean>(
      'required-auth',
      [
        context.getHandler(), // 方法级别的装饰器源数据,
        context.getClass(), // 类级别的装饰器源数据
      ],
    );
    if (!requiredAuth) {
      return true;
    }

    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    const token = authorization.split(' ')[1];

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.user = payload;
      const { exp } = payload;
      const currentTime = Math.floor(Date.now() / 1000);
      // 如果 token 快过期了(3 小时)，则重新签发一个 token
      if (exp - currentTime < 60 * 60 * 3) {
        const newToken = this.jwtService.sign(
          {
            userId: payload.userId,
            username: payload.username,
          },
          {
            expiresIn: '7d',
          },
        );
        response.header('token', newToken);
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('用户未登录');
    }
  }
}
