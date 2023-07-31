import { describe, expect, test } from "vitest";
import { clsx } from "clsx";

describe("clsx", () => {
  test.each([
    {
      args: ["foo", "bar", "baz", 1, 2],
      result: "foo bar baz 1 2",
      case: "normal",
    },
    {
      args: ["foo", "bar", "baz", 0, NaN],
      result: "foo bar baz",
      case: "falsy number",
    },
  ])(
    "($case) 문자열과 숫자 타입으로 이루어진 args를 classname으로 변환한다.",
    ({ args, result }) => {
      expect(clsx(args)).toBe(result);
    }
  );

  test("객체 형식으로 이루어진 args를 truthy한 value를 갖는 객체의 키값을 활용해 classname으로 변환한다.", () => {
    const args = [{ foo: 1 }, { bar: false }, { baz: undefined }];

    expect(clsx(args)).toBe("foo");
  });

  test("Array 형으로 이루어진 args는 해당 배열의 모든 원소를 classname으로 변환한다.", () => {
    const args = [
      [{ foo: 1 }, { bar: false }, { baz: undefined }],
      ["foo", "bar", "baz", 0, NaN, ["foo", "bar", "baz", 1, 2]],
    ];

    expect(clsx(args)).toBe("foo foo bar baz foo bar baz 1 2");
  });

  test("string, number, object 타입이 아닌 arg는 무시한다.", () => {
    const args = [
      ["foo", 1, { a: true }, true, false, Symbol("A"), undefined, () => 1234],
    ];

    expect(clsx(args)).toBe("foo 1 a");
  });
});
