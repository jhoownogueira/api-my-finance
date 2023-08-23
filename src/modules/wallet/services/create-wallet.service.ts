import { Injectable } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository';
import { CreateWalletDTO } from '../dtos/wallet.dto';

@Injectable()
export class CreateWalletService {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(data: CreateWalletDTO) {
    const wallet = await this.walletRepository.save({
      id: data.id,
      name: data.name,
      type: data.type,
      balance: data.balance,
      status: 'ATIVA',
      ownerId: data.ownerId,
    });
    return wallet;
  }
}
