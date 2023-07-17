import { beforeAll, describe, expect, test } from "vitest";
import ReviewModel from "../sampleCode/C05/Review";

let errorMessage: string;

describe("리뷰 관련 테스트", () => {
  beforeAll(() => {
    errorMessage = "Invalid Review Content";
  });

  test("리뷰의 내용을 업데이트 한다.", () => {
    const review = new ReviewModel();
    const newReviewContent = {
      content: "리뷰 작성하긔",
      stars: 5,
    };

    review.updateReviewContent(newReviewContent);

    expect({ content: review.content, stars: review.stars }).toEqual(
      newReviewContent
    );
  });

  test("리뷰 내용이 10자 미만이면 에러가 발생한다.", () => {
    const review = new ReviewModel({
      content: "리뷰를 적다 말",
      stars: 1,
    });
    const handler = () => review.submit();

    expect(handler).toThrow();
  });

  test("리뷰 내용이 1000자를 초과하면 에러가 발생한다.", async () => {
    const review = new ReviewModel({
      content: Array(1001).fill("a").join(""),
      stars: 1,
    });

    try {
      await review.submit();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.message).toBe(errorMessage);
    }
  });

  test("리뷰 별점이 1 ~ 5점이 아니면 에러가 발생한다.", () => {
    const review = new ReviewModel({
      content: "리뷰의 내용이 10자가 넘었어요!",
      stars: 0,
    });
    const handler = () => review.submit();

    // expect(handler).toBeInstanceOf(Error);
    expect(handler).toThrow(errorMessage);
  });

  test("리뷰 모델 생성 시 생성자에 파라미터가 있으면 PATCH API가 호출된다.", () => {
    const review = new ReviewModel({
      content: "리뷰의 내용이 10자가 넘었어요!",
      stars: 5,
    });

    const res = review.submit();

    expect(res.method).toBe("PATCH");
  });

  test("리뷰 모델 생성 시 생성자에 파라미터가 없으면 POST API가 호출된다.", () => {
    const review = new ReviewModel();
    review.updateReviewContent({
      content: "리뷰를 올바르게 작성해주세요",
      stars: 5,
    });

    const res = review.submit();

    expect(res.method).toBe("POST");
  });
});
