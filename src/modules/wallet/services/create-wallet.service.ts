import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository';
import { CreateWalletDTO } from '../dtos/wallet.dto';
import { IUserWalletsRepository } from '../repositories/userWallets.repository';

@Injectable()
export class CreateWalletService {
  constructor(
    private walletRepository: IWalletRepository,
    private userWalletRepository: IUserWalletsRepository,
  ) {}

  async execute(data: CreateWalletDTO, userId: string) {
    const nameIsExisted = await this.walletRepository.findByNameAndOwnerId(
      data.name,
      userId,
    );

    if (nameIsExisted) {
      throw new HttpException('Wallet name is existed', HttpStatus.BAD_REQUEST);
    }

    const wallet = await this.walletRepository.save({
      name: data.name,
      type: data.type,
      balance: data.balance,
      status: 'ATIVA',
      ownerId: userId,
    });

    const userWallet = await this.userWalletRepository.saveUserInWallet({
      userId: userId,
      status: 'ATIVA',
      walletId: wallet.id,
      permissions: 'ADMIN',
    });

    return {
      id: wallet.id,
      name: wallet.name,
      type: wallet.type,
      balance: wallet.balance,
      status: wallet.status,
      ownerId: wallet.ownerId,
      userWallet,
    };
  }
}
