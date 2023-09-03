import { IToggleStarredProduct } from '@/domain/useCases/toggle-starred-product';
import { IStorage } from '../storage/get-set-storage';
import { StarredProduct } from '@/domain/models/StarredProduct';

export class ToggleStarredProduct implements IToggleStarredProduct {
  constructor(private readonly storage: IStorage) {}

  async execute(request: IToggleStarredProduct.Request): Promise<void> {
    const starredProducts: StarredProduct[] = this.storage.get('starred') || [];

    const starredProduct = starredProducts.find(
      (starred) =>
        starred.userEmail === request.userEmail && starred.id === request.id
    );

    let newStarredProducts = [] as StarredProduct[];

    if (starredProduct)
      newStarredProducts = starredProducts.filter(
        ({ id, userEmail }) =>
          userEmail === request.userEmail && id === request.id
      );
    else newStarredProducts = starredProducts.concat([request]);

    this.storage.set('starred', newStarredProducts);
  }
}
