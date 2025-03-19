import { PrismaService } from '@/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { md5 } from '@/utils';
import { RedisService } from '@/redis/redis.service';
import { LoginUserDto, RegisterUserDto } from '@chatverse/common';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  private logger = new Logger(UserService.name);

  // 创建用户
  async createUser(user: RegisterUserDto) {
    const { username, password, nickname, email, captcha } = user;

    // 验证验证码
    const redisCaptcha = await this.redisService.get(
      `register-captcha:${email}`,
    );
    if (!redisCaptcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }
    if (redisCaptcha !== captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    // 验证用户名是否已存在
    const foundUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (foundUserByUsername) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    // 验证邮箱是否已存在
    const foundUserByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (foundUserByEmail) {
      throw new HttpException('该邮箱已被注册', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.prisma.user.create({
        data: {
          username,
          password: md5(password),
          nickname,
          email,
        },
        // 返回的字段
        select: {
          id: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 登录
  async login(user: LoginUserDto) {
    const { username, password } = user;
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (foundUser.password !== md5(password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    return {
      id: foundUser.id,
      username: foundUser.username,
      nickname: foundUser.nickname,
      email: foundUser.email,
    };
  }
}
