import { GetStarredProducts } from '@/data/useCases/get-starred-products';
import { IGetStarredProducts } from '@/domain/useCases/get-starred-products';
import { storage } from '../registry';

export const makeGetStarredProducts = (): IGetStarredProducts =>
  new GetStarredProducts(storage);
