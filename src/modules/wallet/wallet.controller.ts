import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateWalletDTO } from './dtos/wallet.dto';
import { CreateWalletService } from './services/create-wallet.service';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { IRequestJtwDTO } from '../user/dtos/requestJwt.dto';

@Controller('/wallets')
export class WalletController {
  constructor(private readonly createWalletService: CreateWalletService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateWalletDTO, @Request() req: IRequestJtwDTO) {
    return await this.createWalletService.execute(data, req.user.sub);
  }
}
