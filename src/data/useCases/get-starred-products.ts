import { IGetStarredProducts } from '@/domain/useCases/get-starred-products';
import { IStorage } from '../storage/get-set-storage';
import { StarredProduct } from '@/domain/models/StarredProduct';

export class GetStarredProducts implements IGetStarredProducts {
  constructor(private readonly storage: IStorage) {}

  async execute(userEmail: string): Promise<IGetStarredProducts.Response> {
    const starredProducts: StarredProduct[] = this.storage.get('starred') || [];

    const userStarred = starredProducts
      .filter((product) => userEmail === product.userEmail)
      .map(({ id }) => id);

    return userStarred;
  }
}
