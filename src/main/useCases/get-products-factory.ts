import { GetProducts } from '@/data/useCases/get-products';
import { IGetProducts } from '@/domain/useCases/get-products';
import { getAllowedAdjectives, getAllowedNouns, storage } from '../registry';

export const makeGetProducts = (): IGetProducts =>
  new GetProducts(getAllowedNouns, getAllowedAdjectives, storage);
