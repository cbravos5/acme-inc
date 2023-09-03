import { GetAllowedAdjectives } from "@/data/useCases/get-allowed-adjectives";
import { IGetAllowedAdjectives } from "@/domain/useCases/get-allowed-adjectives";

export const makeGetAllowedAdjectives = (): IGetAllowedAdjectives => new GetAllowedAdjectives();