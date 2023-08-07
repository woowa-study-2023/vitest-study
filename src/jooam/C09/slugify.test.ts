import slugify from "slugify";
import { describe, expect, test } from "vitest";

describe("slugify 라이브러리를 테스트한다.", () => {
  // 슬러그(slug)는 URL 친화적인 방식으로 자원을 고유하게 식별하는 데 사용되는 문자열이다.
  test.each([
    { val: "Hello World", expected: "Hello-World" },
    { val: "what is ur eta", expected: "what-is-ur-eta" },
    { val: "stay in the middle", expected: "stay-in-the-middle" },
  ])("일반 문자열을 슬러그로 변환한다.", ({ val, expected }) => {
    const result = slugify(val);

    expect(result).toBe(expected);
  });

  test.each([
    { val: " Hello World ", expected: "Hello-World" },
    { val: "          what is ur eta", expected: "what-is-ur-eta" },
    {
      val: "stay in the middle                    ",
      expected: "stay-in-the-middle",
    },
  ])(
    "일반 문자열의 앞뒤로 공백이 있을 경우 공백을 제외하고 슬러그로 변환한다.",
    ({ val, expected }) => {
      const result = slugify(val);

      expect(result).toBe(expected);
    }
  );

  test("공백이 있는 문자열은 replacement 옵션을 통해 구분자를 넣을 수 있다.", () => {
    const str = "What is ur eta";

    const result = slugify(str, { replacement: "_" });

    expect(result).toBe("What_is_ur_eta");
  });

  test("문자열을 슬러그로 변환할 때 remove 옵션을 사용해 특정 문자를 제거할 수 있다.", () => {
    const str = "What is ur eta";
    const regex = /e/g;

    const result = slugify(str, { remove: regex });

    expect(result).toBe("What-is-ur-ta");
  });

  test("단어는 remove 옵션을 사용해도 지워지지 않는다", () => {
    const str = "What is ur eta";
    const regex = /eta/g;

    const result = slugify(str, { remove: regex });

    expect(result).toBe("What-is-ur-eta");
  });

  test("lower 옵션을 사용해 모든 문자를 소문자로 변환할 수 있다.", () => {
    const str = "What is ur eta";

    const result = slugify(str, { lower: true });

    expect(result).toBe("what-is-ur-eta");
  });

  test("trim 옵션을 이용해 문자열 앞뒤 공백을 유지할 수 있다.", () => {
    const str = " What is ur eta ";

    const result = slugify(str, { trim: false, replacement: "공백" });

    expect(result).toBe("공백What공백is공백ur공백eta공백");
  });

  test("strict 옵션을 사용해 특수 문자를 제거할 수 있다", () => {
    const str = "What is ur !!@@@@@@@!!eta";

    const result = slugify(str, { strict: true });

    expect(result).toBe("What-is-ur-eta");
  });

  test("replacement로 사용되는 특수문자는 strict 옵션으로도 제거되지 않는다.", () => {
    const str = "What is ur !!@@@@@@@!!e_ta";

    const result = slugify(str, { strict: true, replacement: "_" });

    expect(result).toBe("What_is_ur_e_ta");
  });
});
