import { StarredProduct } from "@/domain/models/StarredProduct";
import { atom } from "jotai";

export const starredProductsAtom = atom({} as Record<string, boolean>);