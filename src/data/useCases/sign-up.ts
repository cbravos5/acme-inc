import bcrypt from 'bcrypt';

import { ISignUp } from '@/domain/useCases/sign-up';
import { IStorage } from '../storage/get-set-storage';
import { User } from '@/domain/models/User';

export class SignUp implements ISignUp {
  private readonly salt: string = process.env.NEXT_PUBLIC_SALT || '$2b$10$ESUDuvjrbYT6F6Fu3tfPLO';

  constructor(private readonly storage: IStorage) {}

  async execute(request: ISignUp.Request): Promise<ISignUp.Response> {
    const users: User[] = this.storage.get('users') || [];

    const userExists = users.find(({ email }) => email === request.email);

    if (userExists) throw new Error('Este e-mail já está em uso!');

    const hashedPassword = bcrypt.hashSync(request.password, this.salt);
    const newUsersList = users.concat([{ ...request, password: hashedPassword }]);
    this.storage.set('users', newUsersList);

    return { email: request.email, name: request.name, phone: request.phone };
  }
}
