import { IStorage } from "@/data/storage/get-set-storage";
import { LocalStorageAdapter } from "@/infra/storage/local-storage-adapter";

export const makeStorageAdapater = (): IStorage => new LocalStorageAdapter();