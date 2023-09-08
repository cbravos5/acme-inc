import { Cart } from "@/domain/models/Cart";
import { atom } from "jotai";

export const cartAtom = atom([] as Cart);