import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWalletDTO } from './dtos/wallet.dto';
import { CreateWalletService } from './services/create-wallet.service';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Controller('/wallets')
export class WalletController {
  constructor(private readonly createWalletService: CreateWalletService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateWalletDTO) {
    return await this.createWalletService.execute(data);
  }
}
