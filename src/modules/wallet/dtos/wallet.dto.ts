import { WalletType, WalletStatus } from '@prisma/client';

export type CreateWalletDTO = {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  status: WalletStatus;
  ownerId: string;
};
