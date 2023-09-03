export interface IGetStarredProducts {
  execute(userEmail: string): Promise<IGetStarredProducts.Response>
}

export namespace IGetStarredProducts {
  export type Response = string[];
}