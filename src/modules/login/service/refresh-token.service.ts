import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async execute(refreshToken: string) {
    const tokenData = await this.prisma.userTokens.findFirst({
      where: {
        refreshToken: refreshToken,
      },
      include: {
        user: true,
      },
    });

    if (!tokenData || tokenData.expiresIn <= new Date()) {
      if (tokenData && tokenData.expiresIn <= new Date()) {
        const tokenId = await this.prisma.userTokens.findFirst({
          where: {
            refreshToken: refreshToken,
          },
          select: {
            id: true,
          },
        });
        if (tokenId) {
          await this.prisma.userTokens.delete({
            where: {
              id: tokenId.id,
            },
          });
        }
      }

      throw new UnauthorizedException('Refresh Token inválido ou expirado');
    }

    const payload = {
      sub: tokenData.user.id,
      username: tokenData.user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
