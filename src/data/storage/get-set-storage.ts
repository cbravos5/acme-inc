export interface IStorage {
  get: (key: string) => any;
  set: (key: string, value: object) => void
}