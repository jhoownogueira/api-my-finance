import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInService } from './service/sign-in.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './service/refresh-token.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'pata-de-cachorro',
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInService, RefreshTokenService, PrismaService],
})
export class LoginModule {}
