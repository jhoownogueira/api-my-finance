import { UserPermission, UserWalletStatus } from '@prisma/client';

export type CreateUserWalletDTO = {
  userId: string;
  walletId: string;
  permissions: UserPermission;
  status: UserWalletStatus;
};
