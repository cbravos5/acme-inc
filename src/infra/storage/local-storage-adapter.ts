import { IStorage } from '@/data/storage/get-set-storage';

export class LocalStorageAdapter implements IStorage {
  set(key: string, value: object): void {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }

  get(key: string): any {
    const item = localStorage.getItem(key);

    if (item) return JSON.parse(item)

    return null;
  }
}
