import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInService } from './service/sign-in.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'pata-de-cachorro',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInService, PrismaService],
})
export class LoginModule {}
