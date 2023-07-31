import clsx from "clsx";
import { expect, test } from "vitest";

test("인자로 string 값이 여러개가 오면 연결해서 반환한다.", () => {
  // Arrange && Act
  const result = clsx("금", "교", "영");

  // Assert
  expect(result).toBe("금 교 영");
});

test("Object 형태로 인자를 받으면 값이 falsy하지 않은 값의 key의 이름을 연결해서 반환한다.", () => {
  // Arrange && Act
  const result = clsx({ 금: true, 교: false, 영: true });

  // Assert
  expect(result).toBe("금 영");
});

test("Array 형태로 인자를 받으면 값이 falsy하지 않은 요소만 연결해서 반환한다.", () => {
  // Arrange && Act
  const result = clsx(["금", true, "교", false, "영", false && "고"]);

  // Assert
  expect(result).toBe("금 교 영");
});

test("중첩된 Array 형태의 인자를 받으면 값이 true인 요소만 연결해선 반환한다.", () => {
  // Arrange && Act
  const result = clsx(
    ["foo"],
    ["", 0, false, "bar"],
    [["baz", [["hello"], "there"]]]
  );

  // Assert
  expect(result).toBe("foo bar baz hello there");
});

test("Object, string, Array 형태의 인자를 받으면 falsy하지 않은 값들을 연결해서 반환한다.", () => {
  // Arrange && Act
  const result = clsx(
    "foo",
    [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
    "cya"
  );

  // Assert
  expect(result).toBe("foo bar hello world cya");
});
