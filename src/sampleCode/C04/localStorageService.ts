export interface StorageService {
  getItem(key: string): { term: string; time: string }[] | null;
  setItem(key: string, value: { term: string; time: string }[]): void;
  clear(): void;
}

export class LocalStorageService implements StorageService {
  clear(): void {
    localStorage.clear();
  }
  getItem(key: string): { term: string; time: string }[] | null {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : null;
  }

  setItem(key: string, value: { term: string; time: string }[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
