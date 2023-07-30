import { describe, expect, test } from "vitest";
import { clsx } from "./clsx";

describe("clsx를 이용해 class 문자열을 만든다.", () => {
  test("문자열 Args를 입력 받으면 문자열을 합쳐서 반환한다.", () => {
    // given
    const stringArgs = ["a", "b", "c"];

    // when
    const result = clsx(...stringArgs);

    // then
    expect(result).toBe("a b c");
  });

  test("숫자가 들어왔을 때, 0이 들어오면 0은 무시하고 나머지 숫자는 문자열로 만든다.", () => {
    // given
    const numberArgs = [0, 1, 2, 3];

    // when
    const result = clsx(...numberArgs);

    // then
    expect(result).toBe("1 2 3");
  });

  test("boolean이 들어왔을 때는 무시한다.", () => {
    // given
    const booleanArgs = [true, false, true];

    // when
    const result = clsx(...booleanArgs);

    // then
    expect(result).toBe("");
  });

  test("객체가 들어왔을 때는 객체의 value가 falsy가 아닌 key 값을 클래스 이름으로 가져와 문자열로 반환한다", () => {
    // given
    const objectArgs = [{ a: 1 }, { b: false }, { c: null }, { d: undefined }];

    // when
    const result = clsx(...objectArgs);

    // then
    expect(result).toBe("a");
  });

  test("배열이 들어왔을 때는 falsy가 아닌 배열의 요소를 문자열로 반환한다.", () => {
    // given
    const arrayArgs = [
      [1, 2, 3],
      ["a", "b", "c", false, null, undefined],
    ];

    // when
    const result = clsx(...arrayArgs);

    // then
    expect(result).toBe("1 2 3 a b c");
  });

  test("함수가 들어왔을 때는 무시한다", () => {
    // given
    const functionArgs = [
      () => {
        return 1;
      },
      () => {
        return 2;
      },
    ];

    // when
    const result = clsx(...functionArgs);

    // then
    expect(result).toBe("");
  });

  test("중복된 문자열이 들어와도 한개로 합치지 않는다.", () => {
    // given
    const duplicateArgs = ["a", "a", "b", "c", "c"];

    // when
    const result = clsx(...duplicateArgs);

    // then
    expect(result).toBe("a a b c c");
  });
});
