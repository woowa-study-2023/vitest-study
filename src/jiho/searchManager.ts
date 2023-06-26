interface IStorageService {
  getItem(key: string): { term: string; time: string }[] | null;
  setItem(key: string, value: { term: string; time: string }[]): void;
}

export class LocalStorageService implements IStorageService {
  getItem(key: string): { term: string; time: string }[] | null {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : null;
  }

  setItem(key: string, value: { term: string; time: string }[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export class SearchManager {
  private storageService: IStorageService;
  private storageKey: string;
  private limit: number;

  constructor(
    storageService: IStorageService,
    storageKey = "recentSearches",
    limit = 5
  ) {
    this.storageService = storageService;
    this.storageKey = storageKey;
    this.limit = limit;
  }

  private getSearchTerms() {
    const storedTerms = this.storageService.getItem(this.storageKey);
    return storedTerms ? storedTerms : [];
  }

  addSearchTerm(term: string) {
    let currentTerms = this.getSearchTerms();

    // 검색어가 이미 저장된 경우 해당 검색어를 삭제
    currentTerms = currentTerms.filter((item) => item.term !== term);

    // 검색어가 최대 저장 가능 개수를 초과했을 경우 가장 오래된 검색어를 제거
    if (currentTerms.length >= this.limit) {
      currentTerms.shift();
    }

    const currentTime = getCurrentISOTime();
    currentTerms.push({ term, time: currentTime });
    this.storageService.setItem(this.storageKey, currentTerms);
  }

  removeSearchTerm(term: string) {
    const currentTerms = this.getSearchTerms();
    const updatedTerms = currentTerms.filter((item) => item.term !== term);
    this.storageService.setItem(this.storageKey, updatedTerms);
  }

  listSearchTerms() {
    return this.getSearchTerms();
  }
}

function getCurrentISOTime() {
  return new Date().toISOString();
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
console.log(searchManager.listSearchTerms());
// [{ term: 'TypeScript', time: '2023-06-21T15:30:00.000Z'}, { term: 'GPT-4', time: '2023-06-21T15:31:00.000Z'}]
