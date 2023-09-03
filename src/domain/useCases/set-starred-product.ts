export interface ISetStarredProduct {
  execute(request: ISetStarredProduct.Request): Promise<ISetStarredProduct.Response>
}

export namespace ISetStarredProduct {
  export type Request = {
    id: string;
    userEmail: string;
  };
  export type Response = string[];
}