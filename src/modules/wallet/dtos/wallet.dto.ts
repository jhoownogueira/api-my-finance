import { WalletType, WalletStatus } from '@prisma/client';

export type CreateWalletDTO = {
  name: string;
  type: WalletType;
  balance: number;
  status: WalletStatus;
  ownerId: string;
};

export type ResponseWalletDTO = {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  status: WalletStatus;
  ownerId: string;
};
