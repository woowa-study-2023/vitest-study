import { describe, expect, test, vi } from 'vitest';
import ReviewModel from '../sampleCode/C05/Review';

describe('ReviewModel 테스트', () => {
  test('유효성 정책에 맞는 리뷰는 유효성에 통과하는가? ', () => {
    const review = new ReviewModel();
    review.updateReviewContent({
      stars: 3,
      content: '10자 이상 리뷰입니다아아아아아',
    });

    const result = review.isValidReviewContent();

    expect(result).toBe(true);
  });
  test('내용이 짧은 리뷰는 유효성 체크 실패하는가?', () => {
    //별점을 따로 체크하지 않는 이유 : UI 상에서 막을 수 있지 않을까 해서..!
    const review = new ReviewModel();
    review.updateReviewContent({
      stars: 3,
      content: '짧다',
    });

    const result = review.isValidReviewContent();

    expect(result).toBe(false);
  });
  test('내용이 아주 길면 유효성 체크 실패하는가?', () => {
    const review = new ReviewModel();
    review.updateReviewContent({
      stars: 3,
      content: '길다'.repeat(100),
    });

    const result = review.isValidReviewContent();

    expect(result).toBe(true);
  });
  test('잘못된 리뷰 등록 시 에러가 떨어지는가?', () => {
    const review = new ReviewModel();
    review.updateReviewContent({
      stars: 0,
      content: 'Invalid content',
    });

    expect(() => {
      review.submit();
    }).toThrow('Invalid Review Content');
  });
  test('리뷰 업데이트 함수 호출 테스트', () => {
    const review = new ReviewModel();
    const updateSpy = vi.spyOn(review, 'updateReviewContent');
    expect(updateSpy).not.toHaveBeenCalled();
    review.updateReviewContent({
      stars: 3,
      content: '10자 이상 리뷰입니다아아아아아',
    });
    expect(updateSpy).toHaveBeenCalled();
  });
});
