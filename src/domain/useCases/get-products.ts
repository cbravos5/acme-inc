import { Product } from "@/domain/models/Product";

export interface IGetProducts {
  execute(request: IGetProducts.Request): Promise<IGetProducts.Response>
}

export namespace IGetProducts {
  export type Request = {
    currentPage: number;
    pageSize: number;
  }

  export type Response = {
    products: Product[];
    pagination: {
      currentPage: number;
      hasNextPage: boolean;
    }
  }
}