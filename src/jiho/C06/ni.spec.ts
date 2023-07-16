import { describe, expect, test } from "vitest";
import {
  UnsupportedCommand,
  parseNa,
  parseNi,
  parseNlx,
  parseNr,
  parseNu,
  parseNun,
} from "../../sampleCode/C06/parse";

type Command = "ni" | "nr" | "nu" | "nun" | "nlx" | "na";
const parseArgs = (commandLine: string, command: Command) => {
  const removedCommandString = commandLine.replace(command, "").trim();
  if (removedCommandString === "") return [];

  return removedCommandString.split(" ");
};

describe("ni", () => {
  const command = `ni`;

  test("yarn", () => {
    expect(parseNi("yarn", parseArgs(command, "ni"))).toBe("yarn install");
  });

  test("npm", () => {
    expect(parseNi("npm", parseArgs(command, "ni"))).toBe("npm i");
  });

  test("bun", () => {
    expect(parseNi("bun", parseArgs(command, "ni"))).toBe("bun install");
  });

  test("pnpm", () => {
    expect(parseNi("pnpm", parseArgs(command, "ni"))).toBe("pnpm i");
  });
});

describe("ni react", () => {
  const command = `ni react`;

  test("yarn", () => {
    expect(parseNi("yarn", parseArgs(command, "ni"))).toBe("yarn add react");
  });

  test("npm", () => {
    expect(parseNi("npm", parseArgs(command, "ni"))).toBe("npm i react");
  });

  test("bun", () => {
    expect(parseNi("bun", parseArgs(command, "ni"))).toBe("bun add react");
  });

  test("pnpm", () => {
    expect(parseNi("pnpm", parseArgs(command, "ni"))).toBe("pnpm add react");
  });
});

describe("ni -D @types/react", () => {
  const command = `ni -D @types/react`;

  test("yarn", () => {
    expect(parseNi("yarn", parseArgs(command, "ni"))).toBe(
      "yarn add -D @types/react"
    );
  });

  test("npm", () => {
    expect(parseNi("npm", parseArgs(command, "ni"))).toBe(
      "npm i -D @types/react"
    );
  });

  test("bun", () => {
    expect(parseNi("bun", parseArgs(command, "ni"))).toBe(
      "bun add -d @types/react"
    );
  });

  test("pnpm", () => {
    expect(parseNi("pnpm", parseArgs(command, "ni"))).toBe(
      "pnpm add -D @types/react"
    );
  });
});

describe("ni --frozen", () => {
  const command = `ni --frozen`;

  test("yarn", () => {
    expect(parseNi("yarn", parseArgs(command, "ni"))).toBe(
      "yarn install --frozen-lockfile"
    );
  });

  test("npm", () => {
    expect(parseNi("npm", parseArgs(command, "ni"))).toBe("npm ci");
  });

  test("bun", () => {
    expect(parseNi("bun", parseArgs(command, "ni"))).toBe(
      "bun install --no-save"
    );
  });

  test("pnpm", () => {
    expect(parseNi("pnpm", parseArgs(command, "ni"))).toBe(
      "pnpm i --frozen-lockfile"
    );
  });
});

describe("ni -g eslint", () => {
  const command = `ni -g eslint`;

  test("yarn", () => {
    expect(parseNi("yarn", parseArgs(command, "ni"))).toBe(
      "yarn global add eslint"
    );
  });

  test("npm", () => {
    expect(parseNi("npm", parseArgs(command, "ni"))).toBe("npm i -g eslint");
  });

  test("bun", () => {
    expect(parseNi("bun", parseArgs(command, "ni"))).toBe("bun add -g eslint");
  });

  test("pnpm", () => {
    expect(parseNi("pnpm", parseArgs(command, "ni"))).toBe(
      "pnpm add -g eslint"
    );
  });
});

describe("nr", () => {
  const command = `nr`;

  test("yarn", () => {
    expect(parseNr("yarn", parseArgs(command, "nr"))).toBe("yarn run start");
  });

  test("npm", () => {
    expect(parseNr("npm", parseArgs(command, "nr"))).toBe("npm run start");
  });

  test("bun", () => {
    expect(parseNr("bun", parseArgs(command, "nr"))).toBe("bun run start");
  });

  test("pnpm", () => {
    expect(parseNr("pnpm", parseArgs(command, "nr"))).toBe("pnpm run start");
  });
});

describe("nr dev --port=3000", () => {
  const command = `nr dev --port=3000`;

  test("yarn", () => {
    expect(parseNr("yarn", parseArgs(command, "nr"))).toBe(
      "yarn run dev --port=3000"
    );
  });

  test("npm", () => {
    expect(parseNr("npm", parseArgs(command, "nr"))).toBe(
      "npm run dev -- --port=3000"
    );
  });

  test("bun", () => {
    expect(parseNr("bun", parseArgs(command, "nr"))).toBe(
      "bun run dev --port=3000"
    );
  });

  test("pnpm", () => {
    expect(parseNr("pnpm", parseArgs(command, "nr"))).toBe(
      "pnpm run dev --port=3000"
    );
  });
});

describe("nr -", () => {
  const command = `nr -`;

  test("yarn", () => {
    expect(parseNr("yarn", parseArgs(command, "nr"))).toBe("yarn run -");
  });

  test("npm", () => {
    expect(parseNr("npm", parseArgs(command, "nr"))).toBe("npm run -");
  });

  test("bun", () => {
    expect(parseNr("bun", parseArgs(command, "nr"))).toBe("bun run -");
  });

  test("pnpm", () => {
    expect(parseNr("pnpm", parseArgs(command, "nr"))).toBe("pnpm run -");
  });
});

describe("nlx vitest", () => {
  const command = `nlx vitest`;

  test("yarn", () => {
    expect(parseNlx("yarn", parseArgs(command, "nlx"))).toBe("npx vitest");
  });

  test("npm", () => {
    expect(parseNlx("npm", parseArgs(command, "nlx"))).toBe("npx vitest");
  });

  test("bun", () => {
    expect(parseNlx("bun", parseArgs(command, "nlx"))).toBe("bunx vitest");
  });

  test("pnpm", () => {
    expect(parseNlx("pnpm", parseArgs(command, "nlx"))).toBe("pnpm dlx vitest");
  });
});

describe("nu", () => {
  const command = `nu`;

  test("yarn", () => {
    expect(parseNu("yarn", parseArgs(command, "nu"))).toBe("yarn upgrade");
  });

  test("npm", () => {
    expect(parseNu("npm", parseArgs(command, "nu"))).toBe("npm update");
  });

  test("bun", () => {
    expect(() => parseNu("bun", parseArgs(command, "nu"))).toThrow(
      UnsupportedCommand
    );
  });

  test("pnpm", () => {
    expect(parseNu("pnpm", parseArgs(command, "nu"))).toBe("pnpm update");
  });
});

describe("nun webpack", () => {
  const command = `nun webpack`;

  test("yarn", () => {
    expect(parseNun("yarn", parseArgs(command, "nun"))).toBe(
      "yarn remove webpack"
    );
  });

  test("npm", () => {
    expect(parseNun("npm", parseArgs(command, "nun"))).toBe(
      "npm uninstall webpack"
    );
  });

  test("bun", () => {
    expect(parseNun("bun", parseArgs(command, "nun"))).toBe(
      "bun remove webpack"
    );
  });

  test("pnpm", () => {
    expect(parseNun("pnpm", parseArgs(command, "nun"))).toBe(
      "pnpm remove webpack"
    );
  });
});

describe("nun -g webpack", () => {
  const command = `nun -g webpack`;

  test("yarn", () => {
    expect(parseNun("yarn", parseArgs(command, "nun"))).toBe(
      "yarn global remove webpack"
    );
  });

  test("npm", () => {
    expect(parseNun("npm", parseArgs(command, "nun"))).toBe(
      "npm uninstall -g webpack"
    );
  });

  test("bun", () => {
    expect(parseNun("bun", parseArgs(command, "nun"))).toBe(
      "bun remove -g webpack"
    );
  });

  test("pnpm", () => {
    expect(parseNun("pnpm", parseArgs(command, "nun"))).toBe(
      "pnpm remove --global webpack"
    );
  });
});

describe("na", () => {
  const command = `na`;

  test("yarn", () => {
    expect(parseNa("yarn", parseArgs(command, "na"))).toBe("yarn");
  });

  test("npm", () => {
    expect(parseNa("npm", parseArgs(command, "na"))).toBe("npm");
  });

  test("bun", () => {
    expect(parseNa("bun", parseArgs(command, "na"))).toBe("bun");
  });

  test("pnpm", () => {
    expect(parseNa("pnpm", parseArgs(command, "na"))).toBe("pnpm");
  });
});
