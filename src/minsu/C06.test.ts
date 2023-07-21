import { describe, expect, test } from "vitest"
import { getCommand, parseNu } from "../sampleCode/C06/parse"
import { Agent } from "../sampleCode/C06/agents"

describe("getCommand", () => {
  test("유효한 명령어인지 확인한다.", () => {
    const result = getCommand("npm", "install", ["test", "code"])
    expect(result).toEqual("npm i test code")
  })

  test("유효하지 않은 명령어인지 확인한다.", () => {
    expect(() =>
      getCommand("tan" as Agent, "install", ["test", "code"]),
    ).toThrowError('Unsupported agent "tan"')
  })
})

// 다른 메소들도 아래와 같은 형식으로 판단하면 될 것 같습니다.
describe("parseNi", () => {
  test("upgrade 명령어 키워드를 확인한다.", () => {
    const result = parseNu("pnpm", ["test", "code"])
    expect(result).toEqual("pnpm update test code")
  })

  test("upgrade -i의 명령어 키워드를 확인한다.", () => {
    const result = parseNu("pnpm", ["test", "-i", "code"])
    expect(result).toEqual("pnpm update -i test code")
  })
})
