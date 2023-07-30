import { describe, test, vi, expect, beforeEach, afterEach } from "vitest";
import { SearchManager } from "../jiho/searchManager";
import { StorageService } from "../jiho/localStorageService";

class MockedLocalStorage implements StorageService {
  clear(): void {
    throw new Error("Method not implemented.");
  }
  private data: Record<string, any> = {};
  getItem(key: string): { term: string; time: string }[] | null {
    return this.data?.[key] ?? null;
  }
  setItem(key: string, value: { term: string; time: string }[]): void {
    this.data[key] = value;
  }
}

class DateMockedSut {
  termDateRecord: Record<string, string> = {};

  constructor(private sut: SearchManager) {}

  private getMockDateISOString() {
    return new Date().toISOString();
  }

  addSearchTerm(term: string) {
    vi.advanceTimersByTime(400);
    const mockedDate = this.getMockDateISOString();
    this.termDateRecord[term] = mockedDate;
    vi.setSystemTime(mockedDate);

    this.sut.addSearchTerm(term);
  }

  getTerms() {
    return Object.entries(this.termDateRecord)
      .sort(
        ([, aDate], [, bDate]) =>
          new Date(aDate).getTime() - new Date(bDate).getTime()
      )
      .reduce<{ term: string; time: string }[]>(
        (acc, [term, date]) => [
          ...acc,
          {
            term,
            time: date,
          },
        ],
        []
      );
  }
}

describe("SearchManager", () => {
  const storageKey = "Rich";

  let storage: StorageService;
  let sut: SearchManager;
  let dateMockedSut: DateMockedSut;

  beforeEach(() => {
    vi.useFakeTimers();
    storage = new MockedLocalStorage();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("검색어를 추가할 수 있다.", () => {
    // given
    sut = new SearchManager(storage, storageKey);
    dateMockedSut = new DateMockedSut(sut);
    const spiedSetItem = vi.spyOn(storage, "setItem");

    // when
    dateMockedSut.addSearchTerm("삼겹살");

    // then
    expect(spiedSetItem).toBeCalledWith(storageKey, [
      { term: "삼겹살", time: dateMockedSut.termDateRecord["삼겹살"] },
    ]);
  });

  test("중복된 검색어는 최근에 입력한 것으로 갱신된다.", () => {
    // given
    sut = new SearchManager(storage, storageKey);
    dateMockedSut = new DateMockedSut(sut);
    const spiedSetItem = vi.spyOn(storage, "setItem");

    // when
    dateMockedSut.addSearchTerm("삼겹살");
    dateMockedSut.addSearchTerm("삼겹살");

    // then
    expect(spiedSetItem).toBeCalledTimes(2);
    expect(sut.listSearchTerms()).toEqual(dateMockedSut.getTerms());
  });

  test("검색어가 최대 저장 가능 개수를 초과하면 가장 오래된 검색어가 제거된다.", () => {
    // given
    sut = new SearchManager(storage, storageKey, 2);
    dateMockedSut = new DateMockedSut(sut);
    const oldestTerm = "삼겹살";

    // when
    dateMockedSut.addSearchTerm(oldestTerm);
    dateMockedSut.addSearchTerm("곱창");
    dateMockedSut.addSearchTerm("막창");

    // then
    expect(sut.listSearchTerms()).not.toContain({
      term: oldestTerm,
      time: dateMockedSut.termDateRecord[oldestTerm],
    });
  });
});
