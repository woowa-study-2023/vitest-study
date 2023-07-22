import { describe, test, expect } from "vitest";
import _ from "lodash";

describe("unionBy", () => {
  test("unionBy Number Array", () => {
    expect(_.unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });

  test("unionBy Object Array", () => {
    expect(
      _.unionBy([{ x: 1, y: 2 }], [{ x: 2 }, { x: 1 }, { x: 3 }], "x")
    ).toEqual([{ x: 1, y: 2 }, { x: 2 }, { x: 3 }]);
  });
});

describe("chunk", () => {
  test("chunk", () => {
    expect(_.chunk(["a", "b", "c", "d"], 2)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });
});
