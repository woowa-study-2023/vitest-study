import { afterEach, describe, expect, test, vi } from "vitest";
import { SearchManager } from "./searchManager";
import { LocalStorageService } from "./localStorageService";

vi.mock("./localStorageService", () => {
  const testStorage = new Map<string, unknown>();

  const LocalStorageService = vi.fn();
  LocalStorageService.prototype.getItem = vi.fn((key) => testStorage.get(key));
  LocalStorageService.prototype.setItem = vi.fn((key, value) =>
    testStorage.set(key, value)
  );
  LocalStorageService.prototype.clear = vi.fn(() => testStorage.clear());

  return { LocalStorageService };
});

describe("검색어 서비스", () => {
  const localStorageService = new LocalStorageService();
  afterEach(() => {
    // NOTE 테스트를 위해 clear 메서드를 추가함. bad smell... <- 이런건 그러면 거짓 양성이 될 수도 있을까
    localStorageService.clear();
  });

  test("최근 검색어 목록을 불러온다.", () => {
    const searchManager = new SearchManager(localStorageService);

    searchManager.addSearchTerm("OpenAI");
    searchManager.addSearchTerm("GPT-4");

    expect(searchManager.listSearchTerms()).toMatchObject([
      { term: "OpenAI" },
      { term: "GPT-4" },
    ]);
  });

  test("최근 검색어 목록 최대 개수를 넘어가면 이전 검색어가 삭제된다.", () => {
    const localStorageService = new LocalStorageService();
    const searchManager = new SearchManager(localStorageService, `test-key`, 1);

    searchManager.addSearchTerm("OpenAI");
    searchManager.addSearchTerm("GPT-4");

    expect(searchManager.listSearchTerms()).toMatchObject([{ term: "GPT-4" }]);
  });

  test("최근 검색어 목록에 중복된 검색어가 있으면 중복된 검색어가 삭제된다.", () => {
    const localStorageService = new LocalStorageService();
    const searchManager = new SearchManager(localStorageService);

    searchManager.addSearchTerm("OpenAI");
    searchManager.addSearchTerm("OpenAI");
    searchManager.addSearchTerm("OpenAI");

    expect(searchManager.listSearchTerms()).toMatchObject([{ term: "OpenAI" }]);
  });

  test("검색어를 삭제한다", () => {
    const localStorageService = new LocalStorageService();
    const searchManager = new SearchManager(localStorageService);

    searchManager.addSearchTerm("OpenAI");
    searchManager.addSearchTerm("GPT-4");

    searchManager.removeSearchTerm("OpenAI");
    searchManager.removeSearchTerm("GPT-4");

    expect(searchManager.listSearchTerms()).toEqual([]);
  });
});
