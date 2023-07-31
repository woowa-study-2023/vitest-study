import { clsx } from "clsx";
import { describe, expect, test } from "vitest";

describe("클래스 네임을 clsx 라이브러리를 테스트한다.", () => {
  test("일반 문자열로 클래스 네임을 만들 수 있다.", () => {
    const strArray = ["Lee", "Joo", "Am"];

    const result = clsx(strArray);

    expect(result).toBe("Lee Joo Am");
  });

  test("객체의 키와 속성의 boolean 값을 기반으로 클래스 네임을 만들 수 있다.", () => {
    const obj = {
      Lee: true,
      Joo: false,
      Am: true,
    };

    const result = clsx(obj);

    expect(result).toBe("Lee Am");
  });

  test("객체와 배열의 조합으로 클래스 네임을 만들 수 있다.", () => {
    const obj = {
      My: true,
      name: true,
      is: true,
    };

    const strArray = ["Lee", "Joo", "Am"];

    const result = clsx(obj, strArray);

    expect(result).toBe("My name is Lee Joo Am");
  });

  test("clsx로 만들어진 클래스 네임은 중복을 허용한다.", () => {
    const strArray = ["Lee", "Joo", "Am", "Lee"];

    const result = clsx(strArray);

    expect(result).toBe("Lee Joo Am Lee");
  });

  test("다차원 배열을 이용해 클래스 네임을 만들 수 있다.", () => {
    const strArray = ["Lee", ["Joo"], [["Am"]]];

    const result = clsx(strArray);

    expect(result).toBe("Lee Joo Am");
  });

  test("배열의 원소에서 falsy한 값은 무시한다.", () => {
    const strArray = ["Lee", null, undefined, false, 0, "Joo", "Am"];

    const result = clsx(strArray);

    expect(result).toBe("Lee Joo Am");
  });

  test("객체의 속성 값이 falsy한 값은 무시한다.", () => {
    const obj = {
      Lee: true,
      Joo: false,
      Am: true,
      Kim: null,
      Park: undefined,
      Choi: 0,
    };

    const result = clsx(obj);

    expect(result).toBe("Lee Am");
  });
});
