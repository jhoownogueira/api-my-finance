import { CreateWalletDTO } from '../dtos/wallet.dto';

export abstract class IWalletRepository {
  abstract save(data: CreateWalletDTO): Promise<CreateWalletDTO>;
}
