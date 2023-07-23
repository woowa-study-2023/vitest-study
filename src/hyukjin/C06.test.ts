import { describe, expect, test } from "vitest";
import { parseNi } from "../sampleCode/C06/parse";
import { Agent } from "../sampleCode/C06/agents";

describe("parseNi", () => {
  describe("arg에 -g가 포함되어있을 경우 global command가 적용된다.", () => {
    test.each<{
      agent: Agent;
      args: string[];
      ctx?: { programmatic?: boolean; hasLock?: boolean; cwd?: string };
      result: string;
    }>([
      { agent: "yarn", args: ["-g", "qs"], result: "yarn global add qs" },
      {
        agent: "yarn",
        args: ["-t", "-g", "qs"],
        result: "yarn global add -t qs",
      },
      {
        agent: "yarn",
        args: ["-za", "-g", "qs"],
        result: "yarn global add -za qs",
      },
      {
        agent: "yarn",
        args: ["-g", "--frozen", "qs"],
        result: "yarn global add --frozen qs",
      },
    ])("$agent", ({ agent, args, result }) => {
      const parsed = parseNi(agent, args);

      expect(parsed).toBe(result);
    });
  });

  describe("arg에 —-frozen-if-present 가 포함되어있을 경우 frozen command가 적용된다.", () => {
    test.each<{
      agent: Agent;
      args: string[];
      ctx?: { programmatic?: boolean; hasLock?: boolean; cwd?: string };
      result: string;
    }>([
      {
        agent: "yarn",
        args: ["--frozen-if-present", "qs"],
        result: "yarn install qs",
      },
      {
        agent: "yarn",
        args: ["--frozen-if-present", "qs"],
        ctx: { hasLock: true },
        result: "yarn install --frozen-lockfile",
      },
    ])("$agent", ({ agent, args, ctx, result }) => {
      const parsed = parseNi(agent, args, ctx);

      expect(parsed).toBe(result);
    });
  });

  describe("arg에 —-frozen이 포함되어있을 경우 frozen command가 적용된다.", () => {
    test.each<{
      agent: Agent;
      args: string[];
      ctx?: { programmatic?: boolean; hasLock?: boolean; cwd?: string };
      result: string;
    }>([
      {
        agent: "yarn",
        args: ["--frozen", "qs"],
        result: "yarn install --frozen-lockfile",
      },
      {
        agent: "yarn",
        args: ["--frozen", "-b", "-a", "qs"],
        result: "yarn install --frozen-lockfile",
      },
      {
        agent: "yarn",
        args: ["--frozen", "-c", "-a", "qs"],
        ctx: { hasLock: true },
        result: "yarn install --frozen-lockfile",
      },
    ])("$agent", ({ agent, args, ctx, result }) => {
      const parsed = parseNi(agent, args, ctx);

      expect(parsed).toBe(result);
    });
  });

  describe("arg에 피연산자가 없을 경우 install command가 적용된다.", () => {
    test.each<{
      agent: Agent;
      args: string[];
      ctx?: { programmatic?: boolean; hasLock?: boolean; cwd?: string };
      result: string;
    }>([
      {
        agent: "yarn",
        args: ["-h", "-l", "-a"],
        result: "yarn install -h -l -a",
      },
      {
        agent: "yarn",
        args: ["-a", "-b", "-c"],
        result: "yarn install -a -b -c",
      },
    ])("$agent", ({ agent, args, ctx, result }) => {
      const parsed = parseNi(agent, args, ctx);

      expect(parsed).toBe(result);
    });
  });

  describe("피연산자와 옵션을 제공하여 add를 수행할 수 있다.", () => {
    test.each<{
      agent: Agent;
      args: string[];
      ctx?: { programmatic?: boolean; hasLock?: boolean; cwd?: string };
      result: string;
    }>([
      {
        agent: "yarn",
        args: ["-h", "-l", "-a", "qs"],
        result: "yarn add -h -l -a qs",
      },
      {
        agent: "yarn",
        args: ["qs", "-a", "-b", "-c"],
        result: "yarn add qs -a -b -c",
      },
    ])("$agent", ({ agent, args, ctx, result }) => {
      const parsed = parseNi(agent, args, ctx);

      expect(parsed).toBe(result);
    });
  });
});
