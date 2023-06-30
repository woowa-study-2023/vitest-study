import { StorageService } from "./localStorageService";

export class SearchManager {
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
