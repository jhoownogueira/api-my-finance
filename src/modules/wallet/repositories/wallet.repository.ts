import { CreateWalletDTO, ResponseWalletDTO } from '../dtos/wallet.dto';

export abstract class IWalletRepository {
  abstract save(data: CreateWalletDTO): Promise<ResponseWalletDTO>;
  abstract findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<CreateWalletDTO | null>;
}
