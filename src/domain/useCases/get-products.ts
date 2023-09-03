import { Product } from "@/domain/models/Product";

export interface IGetProducts {
  executePaged(request: IGetProducts.PagedRequest): Promise<IGetProducts.PagedResponse>;

  executeSingle(id: string): Promise<IGetProducts.SingleResponse>;
}

export namespace IGetProducts {
  export type PagedRequest = {
    currentPage: number;
    pageSize: number;
  }

  export type PagedResponse = {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
    }
  }

  export type SingleResponse = Product;
}