import { User } from "@/domain/models/User";

export interface ISignIn {
  execute(request: ISignIn.Request): Promise<ISignIn.Response>
}

export namespace ISignIn {
  export type Request = {
    email: string;
    password: string;
  };
  export type Response = Omit<User, 'password'>;
}