export interface IGetAllowedAdjectives {
  execute(): Promise<IGetAllowedAdjectives.Response>
}

export namespace IGetAllowedAdjectives {
  export type Response = string[];
}