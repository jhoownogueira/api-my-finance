import { PrismaService } from 'src/infra/database/prisma.service';

import { Injectable } from '@nestjs/common';
import { IWalletRepository } from '../wallet.repository';
import { CreateWalletDTO } from '../../dtos/wallet.dto';

@Injectable()
export class WalletPrismaRepository implements IWalletRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: CreateWalletDTO): Promise<CreateWalletDTO> {
    return this.prisma.wallet.create({
      data,
    });
  }
}
