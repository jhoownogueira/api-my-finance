import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { WalletController } from './wallet.controller';
import { IWalletRepository } from './repositories/wallet.repository';
import { WalletPrismaRepository } from './repositories/prisma/wallet.prisma.repository';
import { CreateWalletService } from './services/create-wallet.service';
import { IUserWalletsRepository } from './repositories/userWallets.repository';
import { UserWalletsPrismaRepository } from './repositories/prisma/userWallet.prisma.repository';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [
    CreateWalletService,
    PrismaService,
    {
      provide: IWalletRepository,
      useClass: WalletPrismaRepository,
    },
    {
      provide: IUserWalletsRepository,
      useClass: UserWalletsPrismaRepository,
    },
  ],
})
export class WalletModule {}
