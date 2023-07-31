import { describe, expect, test } from "vitest";
import { unionBy, chunk } from "lodash";

describe("unionBy", () => {
  test("Iteratee가 제공되지 않아도 union 할 수 있다.", () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];

    expect(unionBy(array1, array2)).toEqual([1, 2, 3, 4]);
  });

  test("Iteratee 함수를 제공해 union 기준을 정할 수 있다.", () => {
    const array1 = ["abc", "def"];
    const array2 = ["aBc", "DEF", "zzz"];

    expect(unionBy(array1, array2, (it) => it.toLowerCase())).toEqual([
      "abc",
      "def",
      "zzz",
    ]);
  });

  test("Iteratee shorthand를 제공해 union 기준을 정할 수 있다.", () => {
    const array1 = [{ foo: "bar1" }, { foo: "bar2" }];
    const array2 = [{ foo: "bar1" }, { foo: "bar3" }];

    expect(unionBy(array1, array2, "foo")).toEqual([
      { foo: "bar1" },
      { foo: "bar2" },
      { foo: "bar3" },
    ]);
  });
});

interface ChunkParams {
  array: Parameters<typeof chunk>[0];
  size: Parameters<typeof chunk>[1];
}

describe("chunk", () => {
  test.each<ChunkParams>([
    { array: [], size: 2 },
    { array: null, size: 2 },
    { array: undefined, size: 2 },
    { array: [1, 2], size: 0 },
    { array: [1, 2], size: -1 },
  ])("입력 값이 부적절한 경우 chunk하지 않는다", ({ array, size }) => {
    expect(chunk(array, size)).toEqual([]);
  });

  test("size를 제공하지 않아도 chunk한다.", () => {
    const array = [1, 2, 3, 4, 5];

    expect(chunk(array)).toEqual([[1], [2], [3], [4], [5]]);
  });

  test("Array의 길이가 size와 나누어 떨어지지 않는 경우 나머지는 마지막에 채워진다.", () => {
    const array = [1, 2, 3, 4, 5];
    const size = 2;

    expect(chunk(array, size)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
