import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';
import * as crypto from 'crypto';

function generateRefreshToken(): string {
  return crypto.randomBytes(24).toString('hex');
}

@Injectable()
export class SignInService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async execute(data: SignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario incorreto');
    }

    const isEqualPassword = await compare(data.password, user.password);

    if (!isEqualPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = generateRefreshToken();

    await this.prisma.userTokens.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await this.prisma.userTokens.create({
      data: {
        userId: user.id,
        refreshToken: refreshToken,
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: token,
      refreshToken: refreshToken,
    };
  }
}
