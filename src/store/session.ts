import { User } from "@/domain/models/User";
import { atom } from "jotai";

type SessionAtom = {
  active: boolean;
  user: Omit<User, 'password'> | null;
}

export const sessionAtom = atom<SessionAtom>({ active: false, user: null });