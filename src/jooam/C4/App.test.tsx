import { expect, test } from "vitest";

import { SearchManager } from "../../jiho/searchManager";
import { LocalStorageService } from "../../jiho/localStorageService";

type SearchTermType = {
  term: string;
  time: string;
};

const getTerms = (terms: SearchTermType[]): string[] => {
  return terms.map((item) => item.term);
};

test("검색하면 검색어가 저장된다.", () => {
  // 준비
  const sut = new SearchManager(new LocalStorageService());

  // 실행
  sut.addSearchTerm("이주암");

  // 평가
  expect(getTerms(sut.listSearchTerms())).toContain("이주암");
});

test("검색어를 삭제하면 검색어가 삭제된다.", () => {
  // 준비
  const sut = new SearchManager(new LocalStorageService());
  sut.addSearchTerm("이주암");

  // 실행
  sut.removeSearchTerm("이주암");

  // 평가
  expect(getTerms(sut.listSearchTerms())).not.toContain("이주암");
});

test("검색어는 중복으로 저장되지 않는다.", () => {
  // 준비
  const sut = new SearchManager(new LocalStorageService());
  sut.addSearchTerm("이주암");

  // 실행
  sut.addSearchTerm("이주암");

  // 평가
  expect(sut.listSearchTerms().filter((x) => x.term === "이주암").length).toBe(
    1
  );
});

test("검색어가 5개 이상 저장될 때 가장 오래된 검색어가 삭제된다.", () => {
  // 준비
  const sut = new SearchManager(new LocalStorageService());
  Array(5)
    .fill(undefined)
    .forEach((_, index) => {
      sut.addSearchTerm(`이주암${index}`);
    });

  // 실행
  sut.addSearchTerm("이주암6");

  // 평가
  expect(getTerms(sut.listSearchTerms())).not.toContain("이주암0");
});
