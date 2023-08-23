import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [UserModule, LoginModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
