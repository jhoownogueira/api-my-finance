import { CreateUserWalletDTO } from '../dtos/userWallets.dto';

export abstract class IUserWalletsRepository {
  abstract saveUserInWallet(
    data: CreateUserWalletDTO,
  ): Promise<CreateUserWalletDTO>;
}
