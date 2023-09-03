import { Product } from "@/domain/models/Product";

export interface IGetProduct {
  execute(id: string): Promise<IGetProduct.Response>
}

export namespace IGetProduct {
  export type Response = Product;
}