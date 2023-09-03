import { ISignUp } from '@/domain/useCases/sign-up';
import { SignUp } from '@/data/useCases/sign-up';
import { storage } from '../registry';

export const makeSignUp = (): ISignUp => new SignUp(storage);
