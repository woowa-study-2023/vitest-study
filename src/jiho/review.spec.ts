import { describe, expect, test } from "vitest";
import ReviewModel, { why } from "../sampleCode/C05/Review";

describe("리뷰 작성", () => {
  test.each([
    // Stars Validation Failed
    {
      stars: 0,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: "Invalid Review Content",
    },
    {
      stars: 6,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: "Invalid Review Content",
    },

    {
      stars: 1,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: null,
    },

    // Content Validation Failed
    { stars: 1, content: "리뷰", expectedError: "Invalid Review Content" },
    {
      stars: 1,
      content: "리뷰".repeat(501),
      expectedError: "Invalid Review Content",
    },
  ])(
    `[CREATE] 별점: $stars, 내용: $content`,
    ({ stars, content, expectedError }) => {
      const review = new ReviewModel();
      review.updateReviewContent({ stars, content });

      if (expectedError) {
        expect(() => review.submit()).toThrowError();

        return;
      }

      expect(review.submit()).toEqual({
        method: "POST",
        param: { stars, content },
      });
    }
  );

  test.each([
    // Stars Validation Failed
    {
      stars: 0,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: "Invalid Review Content",
    },
    {
      stars: 6,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: "Invalid Review Content",
    },

    {
      stars: 1,
      content: "리뷰는 열글자 이상 작성합니다.",
      expectedError: null,
    },

    // Content Validation Failed
    { stars: 1, content: "리뷰", expectedError: "Invalid Review Content" },
    {
      stars: 1,
      content: "리뷰".repeat(501),
      expectedError: "Invalid Review Content",
    },
  ])(
    `[UPDATE] 별점: $stars, 내용: $content`,
    ({ stars, content, expectedError }) => {
      const review = new ReviewModel({ stars, content });

      if (expectedError) {
        expect(() => review.submit()).toThrowError();

        return;
      }

      expect(review.submit()).toEqual({
        method: "PATCH",
        param: { stars, content },
      });
    }
  );
});
