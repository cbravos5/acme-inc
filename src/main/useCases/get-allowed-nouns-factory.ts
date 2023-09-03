import { GetAllowedNouns } from "@/data/useCases/get-allowed-nouns";
import { IGetAllowedNouns } from "@/domain/useCases/get-allowed-nouns";

export const makeGetAllowedNouns = (): IGetAllowedNouns => new GetAllowedNouns();