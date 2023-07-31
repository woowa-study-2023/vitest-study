import { describe, expect, test } from "vitest";
import { getCommand, parseNa, parseNi, parseNlx, parseNr, parseNu, parseNun } from "../sampleCode/C06/parse";

test("na는 agent alias의 역할을 한다.", () => {
  expect(parseNa("npm", ["run", "foo"])).toBe("npm run foo");
  expect(parseNa("yarn", ["run", "foo"])).toBe("yarn run foo");
  expect(parseNa("pnpm", ["run", "foo"])).toBe("pnpm run foo");
  expect(parseNa("bun", ["run", "foo"])).toBe("bun run foo");
});

test("nlx는 download & execute의 역할을 한다.", () => {
  expect(parseNlx("npm", ["vitest"])).toBe("npx vitest");
  expect(parseNlx("yarn", ["vitest"])).toBe("npx vitest");
  expect(parseNlx("pnpm", ["vitest"])).toBe("pnpm dlx vitest");
  expect(parseNlx("bun", ["vitest"])).toBe("bunx vitest");
});

test("nun은 uninstall의 역할을 한다.", () => {
  expect(parseNun("npm", ["vitest"])).toBe("npm uninstall vitest");
  expect(parseNun("yarn", ["vitest"])).toBe("yarn remove vitest");
  expect(parseNun("pnpm", ["vitest"])).toBe("pnpm remove vitest");
  expect(parseNun("bun", ["vitest"])).toBe("bun remove vitest");
});

test("nun 인자에 -g를 포함하면 global uninstall로 처리한다.", () => {
    expect(parseNun("npm", ['-g',"vitest"])).toBe("npm uninstall -g vitest");
    expect(parseNun("yarn", ['-g',"vitest"])).toBe("yarn global remove vitest");
    expect(parseNun("pnpm", ['-g',"vitest"])).toBe("pnpm remove --global vitest");
    expect(parseNun("bun", ['-g',"vitest"])).toBe("bun remove -g vitest");
  });

test('nu는 업그레이드를 담당한다.', () => {
    expect(parseNu("npm", ["vitest"])).toBe("npm update vitest")
    expect(parseNu("yarn", ["vitest"])).toBe("yarn upgrade vitest")
    expect(parseNu("pnpm", ["vitest"])).toBe("pnpm update vitest")
})

test('nu 인자에 -i를 포함하면 interactive upgrade로 처리한다.', () => {
    expect(parseNu("yarn", ['-i',"vitest"])).toBe("yarn upgrade-interactive vitest")
    expect(parseNu("pnpm", ['-i', "vitest"])).toBe("pnpm update -i vitest")
})

test('nr은 run의 역할을 한다.', () => {
    expect(parseNr("npm", ["test"])).toBe("npm run test")
    expect(parseNr("yarn", ["test"])).toBe("yarn run test")
    expect(parseNr("pnpm", ["test"])).toBe("pnpm run test")
    expect(parseNr("bun", ["test"])).toBe("bun run test")
})

test('nr에 --인자를 넣으면 각 agent마다 올바르게 변환한다', () => {
    expect(parseNr("npm", ["dev", "--port=3000"])).toBe("npm run dev -- --port=3000")
    expect(parseNr("yarn", ["dev", "--port=3000"])).toBe("yarn run dev --port=3000")
    expect(parseNr("pnpm", ["dev", "--port=3000"])).toBe("pnpm run dev --port=3000")
    expect(parseNr("bun", ["dev", "--port=3000"])).toBe("bun run dev --port=3000")
})

test('ni는 install의 역할을 한다.', () => {
    expect(parseNi("npm", ["vitest"])).toBe("npm i vitest")
    expect(parseNi("yarn", ["vitest"])).toBe("yarn add vitest")
    expect(parseNi("pnpm", ["vitest"])).toBe("pnpm add vitest")
    expect(parseNi("bun", ["vitest"])).toBe("bun add vitest")
})

describe('getCommand',()=>{
    test('getCommand는 허용되지 않은 agent가 있으면 에러를 생성한다.', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(()=>getCommand("kky" as any,'add',['hi'])).toThrow()
    })
    test('getCommand는 허용되지 않은 command가 있으면 에러를 생성한다.', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(()=>getCommand("npm",'hi' as any,['vitest'])).toThrow()
    })

})

      
  
