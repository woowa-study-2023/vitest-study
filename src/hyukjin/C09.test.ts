import { describe, expect, test } from "vitest";
import slugify from "slugify";

describe("slugify", () => {
  test("공백을 하이픈으로 대체할 수 있다.", () => {
    const str = "hello world";

    expect(slugify(str)).toBe("hello-world");
  });

  test("공백을 대체 문자를 `replacement` 옵션으로 지정할 수 있다.", () => {
    const str = "hello world";

    expect(
      slugify(str, {
        replacement: "@",
      })
    ).toBe("hello@world");
  });

  test("숫자와 공백과 $*_+~.()'\"!\\-: 을 제외한 문자열은 삭제된다.", () => {
    const str = "hello√∫ world";

    expect(
      slugify(str, {
        replacement: "@",
      })
    ).toBe("hello@world");
  });

  test("삭제는 공백 대체 이후에 이뤄진다.", () => {
    const str = "hello√∫ world";

    expect(
      slugify(str, {
        replacement: "all_word_should_be_removed",
        remove: /[\w]/g,
      })
    ).toBe("√∫");
  });

  test("lower 옵션을 사용하면 소문자로 변환할 수 있다.", () => {
    const str = "HELLO WORLD";

    expect(
      slugify(str, {
        lower: true,
      })
    ).toBe("hello-world");
  });

  test("양 끝의 공백은 자동으로 제거된다.", () => {
    const str = " HELLO WORLD ";
    expect(
      slugify(str, {
        lower: true,
      })
    ).toBe("hello-world");
  });

  test("trim 옵션을 false로 주어 양 끝의 공백을 제거하지 않을 수 있다.", () => {
    const str = " hello world ";

    expect(
      slugify(str, {
        trim: false,
      })
    ).toBe("-hello-world-");
  });

  test("locale 옵션을 사용하면 locale에 해당하는 문자로 변환한다.", () => {
    const str = "♥";

    expect(
      slugify(str, {
        locale: "es",
      })
    ).toBe("amor");
  });

  test("공백은 가장 마지막에 치환된다.", () => {
    const str = "hello@@ @@world";

    expect(
      slugify(str, {
        replacement: "@",
        remove: /@/g,
      })
    ).toBe("hello@world");
  });

  test("치환 가능한 문자는 charMap에 의해 치환된다.", () => {
    const str = "ø≈ç√∫˜µœ∑®†";

    expect(slugify(str, {})).toBe("ocoesum(r)+");
  });
});
