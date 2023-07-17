// isValidReviewContent은 private이 되어야하는 것일까?
// stars: number;
// content: string;
// mode: ReviewSubmitMode; 모두 private일까

import { describe, expect, test } from "vitest";
import ReviewModel from "../sampleCode/C05/Review";

describe("ReviewModel", () => {
  test("review가 유효하지 않으면 에러를 생성한다.", () => {
    // given
    const review = new ReviewModel();

    review.updateReviewContent({
      stars: 0,
      content: "hi my",
    });

    // then
    // 왜 아래 테스트는 실패할까? 
    // expect(review.submit).toThrowError("Invalid Review Content");
    expect(() => review.submit()).toThrowError("Invalid Review Content");
  });

  test("ReviewSubmitMode가 `Create`일 때 review가 유효하면 api를 호출한다.", () => {
    const review = new ReviewModel();

    review.updateReviewContent({
      stars: 5,
      content: "hi my name is kyoyoung",
    });

    expect(review.submit()).toEqual({
      method: "POST",
      param: {
        stars: 5,
        content: "hi my name is kyoyoung",
      },
    });
  });

  test("ReviewSubmitMode가 `Patch`일 때 review가 유효하면 api를 호출한다.", () => {
    const review = new ReviewModel({
      content: "hi my name is kyoyoung",
      stars: 3,
    });

    review.updateReviewContent({
        stars: 5,
        content: "hi my name is kyoyoung",
    });

    expect(review.submit()).toEqual({
      method: "PATCH",
      param: {
        stars: 5,
        content: "hi my name is kyoyoung",
      },
    });
  });
});
