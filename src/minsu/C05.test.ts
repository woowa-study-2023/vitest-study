import { describe, expect, test } from 'vitest';
import ReviewModel from '../sampleCode/C05/Review';

const dummyData = { stars: 5, content: 'updateReview' };

describe('ReviewModel', () => {
  test('리뷰 정보가 업데이트되는지 검증합니다.', () => {
    const review = new ReviewModel({ stars: 0, content: 'test' });
    review.updateReviewContent(dummyData);
    const updateReview = { stars: review.stars, content: review.content };
    expect(dummyData).toEqual(updateReview);
  });

  test('리뷰 정보의 유효성을 검증합니다.', () => {
    //분기 테스트를 하는 경우 세 가지 조건 모두 검증 분기 커버리지
    const review1 = new ReviewModel({ stars: 0, content: 'test'.repeat(5) });
    const result1 = review1.isValidReviewContent();

    expect(result1).toBeFalsy();

    const review2 = new ReviewModel({ stars: 3, content: 'test'.repeat(1000) });
    const result2 = review2.isValidReviewContent();

    expect(result2).toBeFalsy();

    const review3 = new ReviewModel({ stars: 3, content: 'test'.repeat(5) });
    const result3 = review3.isValidReviewContent();

    expect(result3).toBeTruthy();
  });

  test('서버 호출 로직을 검증합니다.', () => {
    // 분기커버리지 -> 성공하는 로직은 시간이 부족해서 완성하지 못했습니다 ㅠ
    const review1 = new ReviewModel({ stars: 0, content: 'test'.repeat(5) });

    expect(() => review1.submit()).toThrowError('Invalid Review Content');
  });
});
