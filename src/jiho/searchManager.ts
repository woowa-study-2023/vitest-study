interface StorageService {
  getItem(key: string): string[] | null;
  setItem(key: string, value: string[]): void;
}

class LocalStorageService implements StorageService {
  getItem(key: string): string[] | null {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : null;
  }

  setItem(key: string, value: string[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

class SearchManager {
  private storageService: StorageService;
  private storageKey: string;
  private limit: number;

  constructor(
    storageService: StorageService,
    storageKey = "recentSearches",
    limit = 5
  ) {
    this.storageService = storageService;
    this.storageKey = storageKey;
    this.limit = limit;
  }

  private getSearchTerms(): string[] {
    const storedTerms = this.storageService.getItem(this.storageKey);
    return storedTerms ? storedTerms : [];
  }

  addSearchTerm(term: string): void {
    let currentTerms = this.getSearchTerms();

    // 검색어가 이미 저장된 경우 해당 검색어를 삭제
    currentTerms = currentTerms.filter((item) => item !== term);

    // 검색어가 최대 저장 가능 개수를 초과했을 경우 가장 오래된 검색어를 제거
    if (currentTerms.length >= this.limit) {
      currentTerms.shift();
    }

    currentTerms.push(term);
    this.storageService.setItem(this.storageKey, currentTerms);
  }

  removeSearchTerm(term: string): void {
    const currentTerms = this.getSearchTerms();
    const updatedTerms = currentTerms.filter((item) => item !== term);
    this.storageService.setItem(this.storageKey, updatedTerms);
  }

  listSearchTerms(): string[] {
    return this.getSearchTerms();
  }
}

// 사용 예시
const searchManager = new SearchManager(new LocalStorageService());

// 검색어 추가
searchManager.addSearchTerm("OpenAI");
searchManager.addSearchTerm("GPT-4");
searchManager.addSearchTerm("TypeScript");
searchManager.addSearchTerm("GPT-4"); // 중복 검색어 추가 시도

// 검색어 삭제
searchManager.removeSearchTerm("OpenAI");

// 검색어 조회
console.log(searchManager.listSearchTerms()); // ['TypeScript', 'GPT-4']
