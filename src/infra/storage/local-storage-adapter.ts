import { IStorage } from '@/data/storage/get-set-storage';

export class LocalStorageAdapter implements IStorage {
  set(key: string, value: object): void {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
}
