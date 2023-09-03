import { makeStorageAdapater } from './adapters/local-storage-adapter-factory';
import { makeGetAllowedAdjectives } from './useCases/get-allowed-adjectives-factory';
import { makeGetAllowedNouns } from './useCases/get-allowed-nouns-factory';
import { makeGetProducts } from './useCases/get-products-factory';
import { makeGetStarredProducts } from './useCases/get-starred-products-factory';
import { makeSignIn } from './useCases/sign-in-factory';
import { makeSignUp } from './useCases/sign-up-factory';
import { makeToggleStarredProduct } from './useCases/toggle-starred-product-factory';

export const storage = makeStorageAdapater();

export const getAllowedNouns = makeGetAllowedNouns();
export const getAllowedAdjectives = makeGetAllowedAdjectives();
export const getProducts = makeGetProducts();
export const getStarredProducts = makeGetStarredProducts();
export const toggleStarredProduct = makeToggleStarredProduct();
export const signIn = makeSignIn();
export const signUp = makeSignUp();
