import { IToggleStarredProduct } from '@/domain/useCases/toggle-starred-product';
import { storage } from '../registry';
import { ToggleStarredProduct } from '@/data/useCases/toggle-starred-product';

export const makeToggleStarredProduct = (): IToggleStarredProduct =>
  new ToggleStarredProduct(storage);
