import { ISignIn } from '@/domain/useCases/sign-in';
import { storage } from '../registry';
import { SignIn } from '@/data/useCases/sign-in';

export const makeSignIn = (): ISignIn => new SignIn(storage);
