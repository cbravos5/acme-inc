import { StarredProduct } from "../models/StarredProduct"

export interface IToggleStarredProduct {
  execute(request: IToggleStarredProduct.Request): Promise<void>
}

export namespace IToggleStarredProduct {
  export type Request = StarredProduct;
}