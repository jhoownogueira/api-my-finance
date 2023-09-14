import { PrismaService } from 'src/infra/database/prisma.service';

import { Injectable } from '@nestjs/common';
import { IWalletRepository } from '../wallet.repository';
import { CreateWalletDTO, ResponseWalletDTO } from '../../dtos/wallet.dto';

@Injectable()
export class WalletPrismaRepository implements IWalletRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: CreateWalletDTO): Promise<ResponseWalletDTO> {
    return this.prisma.wallet.create({
      data,
    });
  }

  async findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<CreateWalletDTO | null> {
    return this.prisma.wallet.findFirst({
      where: {
        name,
        ownerId,
      },
      select: {
        name: true,
        type: true,
        balance: true,
        status: true,
        ownerId: true,
      },
    });
  }
}
