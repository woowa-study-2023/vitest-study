import { describe, expect, test } from "vitest";
import slugify from "slugify";
describe("slugify default 설정값을 사용했을 때", () => {
  test("문자열에서 띄어쓰기를 -(하이픈)으로 변환한다.", () => {
    // given
    const input = "hello world";
    // when
    const result = slugify(input);
    // then
    expect(result).toBe("hello-world");
  });

  test("문자열에서 특정(#, ^, =, -) 특수문자를 제거한다.", () => {
    // given
    const input = "!@*()_+#^=-";
    // when
    const result = slugify(input);
    // then
    expect(result).toBe("!@*()_+");
  });

  test("특수문자 $는 dollar로 변환한다.", () => {
    // given
    const input = "hello $ world";
    // when
    const result = slugify(input);
    // then
    expect(result).toBe("hello-dollar-world");
  });

  test("특수문자 &는 and로 변환한다.", () => {
    // given
    const input = "hello & world";
    // when
    const result = slugify(input);
    // then
    expect(result).toBe("hello-and-world");
  });

  test("특수문자 %는 percent로 변환한다.", () => {
    // given
    const input = "hello % world";
    // when
    const result = slugify(input);
    // then
    expect(result).toBe("hello-percent-world");
  });
});

describe("slugify options에 설정값을 변경했을 때", () => {
  test("replacement 옵션을 이용해서 문자열에서 띄어쓰기를 _(언더바)으로 변환한다.", () => {
    // given
    const input = "hello world";
    // when
    const result = slugify(input, {
      replacement: "_",
    });
    // then
    expect(result).toBe("hello_world");
  });

  test("lower 옵션을 이용해서 대문자를 소문자로 변환한다.", () => {
    // given
    const input = "HELLO WORLD";
    // when
    const result = slugify(input, {
      lower: true,
    });
    // then
    expect(result).toBe("hello-world");
  });

  test("remove 옵션을 이용해서 문자열에서 단일문자의 정규표현식을 기반으로 문자를 제거한다.", () => {
    // given
    const input = "apple and juice";
    // when
    const result = slugify(input, {
      remove: /a/g,
    });
    // then
    expect(result).toBe("pple-nd-juice");
  });

  test("문자열에서 단어를 정규표현식으로 넣어도 문자를 제거하지 않는다.", () => {
    // given
    const input = "apple and juice";
    // when
    const result = slugify(input, {
      remove: /apple/g,
    });
    // then
    expect(result).toBe("apple-and-juice");
  });

  test("strict 옵션을 이용해서 문자열에서 replacement를 제외한 특수문자를 전부 제거한다.", () => {
    // given
    const input = "hello-world!@#^*()_+";
    // when
    const result = slugify(input, {
      strict: true,
    });
    // then
    expect(result).toBe("hello-world");
  });

  test("locale 지원하지 않는 문자가 들어오면 제거한다.", () => {
    // given
    const input = "안녕하세요";
    // when
    const result = slugify(input, {
      locale: "kr",
    });
    // then
    expect(result).toBe("");
  });

  test("locale 지원하는 문자가 들어오면 영문으로 변환한다.", () => {
    // given
    const input = "ÄäÖöÜüß♥";
    // when
    const result = slugify(input, {
      locale: "de",
    });
    // then
    expect(result).toBe("AEaeOEoeUEuessliebe");
  });

  test("tirm 옵션을 false로 둬서 문자열의 양쪽 공백을 replacement로 변환한다.", () => {
    // given
    const input = " hello world ";
    // when
    const result = slugify(input, {
      trim: false,
    });
    // then
    expect(result).toBe("-hello-world-");
  });
});
