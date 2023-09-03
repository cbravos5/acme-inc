import { User } from "@/domain/models/User";

export interface ISignUp {
  execute(request: ISignUp.Request): Promise<ISignUp.Response>
}

export namespace ISignUp {
  export type Request = User;
  export type Response = Omit<User, 'password'>;
}