import bcrypt from 'bcrypt';

import { ISignIn } from '@/domain/useCases/sign-in';
import { IStorage } from '../storage/get-set-storage';
import { User } from '@/domain/models/User';

export class SignIn implements ISignIn {
  constructor(private readonly storage: IStorage) {}

  async execute(request: ISignIn.Request): Promise<ISignIn.Response> {
    const users: User[] = this.storage.get('users') || [];

    const user = users.find(({ email }) => email === request.email);

    if (!user) throw new Error('Dados inválidos!');

    const matches = bcrypt.compareSync(request.password, user.password);

    if (!matches) throw new Error('Dados inválidos!')

    return { email: user.email, name: user.name, phone: user.phone };
  }
}
