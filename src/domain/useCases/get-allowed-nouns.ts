export interface IGetAllowedNouns {
  execute(): Promise<IGetAllowedNouns.Response>
}

export namespace IGetAllowedNouns {
  export type Response = string[];
}