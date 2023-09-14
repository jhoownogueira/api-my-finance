import { PrismaService } from 'src/infra/database/prisma.service';

import { Injectable } from '@nestjs/common';
import { IUserWalletsRepository } from '../userWallets.repository';
import { CreateUserWalletDTO } from '../../dtos/userWallets.dto';

@Injectable()
export class UserWalletsPrismaRepository implements IUserWalletsRepository {
  constructor(private prisma: PrismaService) {}

  async saveUserInWallet(
    data: CreateUserWalletDTO,
  ): Promise<CreateUserWalletDTO> {
    return this.prisma.userWallet.create({
      data,
    });
  }
}
