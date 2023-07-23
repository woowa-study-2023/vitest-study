import { beforeEach, describe, expect, test, vi } from "vitest";
import ReviewModel from "../sampleCode/C05/Review";

describe("ReviewModel", () => {
  let sut: ReviewModel;

  beforeEach(() => {
    sut = new ReviewModel();
  });

  test("리뷰에서 별점은 필수 입력 사항이다.", () => {
    // given
    const content = {
      stars: 0,
      content: expect.anything(),
    };

    // when
    sut.updateReviewContent(content);

    // then
    expect(() => sut.submit()).toThrowError();
  });

  test("리뷰에서 별점은 정해진 범주에서만 입력이 가능하다.", () => {
    // given
    const outOfRangeStar = 6;
    const content = {
      stars: outOfRangeStar,
      content: expect.anything(),
    };

    // when
    sut.updateReviewContent(content);

    // then
    expect(() => sut.submit()).toThrowError();
  });

  test("리뷰의 컨텐츠는 입력하지 않아도 된다.", () => {
    // given
    const content = {
      stars: 5,
      content: "",
    };

    // when
    sut.updateReviewContent(content);

    // then
    expect(() => sut.submit()).not.toThrowError();
  });

  test("리뷰의 컨텐츠는 최소 10자 이상이어야한다.", () => {
    // given
    const content = {
      stars: 5,
      content: Array.from(new Array(9), () => "1").join(""),
    };

    // when
    sut.updateReviewContent(content);

    // then
    expect(() => sut.submit()).toThrowError();
  });

  test("리뷰의 컨텐츠는 최대 1000자까지만 허용된다", () => {
    // given
    const content = {
      stars: 5,
      content: Array.from(new Array(1001), () => "1").join(""),
    };

    // when
    sut.updateReviewContent(content);

    // then
    expect(() => sut.submit()).toThrowError();
  });
});
