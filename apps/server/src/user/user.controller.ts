import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from '@chatverse/common';
import { generateRandomCode } from '@/utils';
import { EmailService } from '@/email/email.service';
import { RedisService } from '@/redis/redis.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly redisService: RedisService,
  ) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return this.userService.createUser(registerUser);
  }

  @Get('register-captcha')
  async getRegisterCaptcha(@Query() query: { address: string }) {
    const code = generateRandomCode(4);

    await this.redisService.set(
      `register-captcha:${query.address}`,
      code,
      60 * 10, // 10分钟
    );
    await this.emailService.sendEmail({
      to: query.address,
      subject: '注册验证码',
      html: `<p>您的验证码是: <strong>${code}</strong></p>`,
    });
    return '发送成功';
  }
}
