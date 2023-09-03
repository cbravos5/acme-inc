import { Cart } from "@/domain/models/Cart";
import { User } from "@/domain/models/User";

export interface IPostCheckout {
  execute(request: IPostCheckout.Request): Promise<IPostCheckout.Response>
}

export namespace IPostCheckout {
  export type Request = Cart & Omit<User,'password'>;
  export type Response = string; //json
}