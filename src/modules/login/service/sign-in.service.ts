import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';

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
      throw new UnauthorizedException();
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

    return {
      access_token: token,
    };
  }
}
