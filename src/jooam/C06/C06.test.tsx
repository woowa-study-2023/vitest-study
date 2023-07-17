import { describe, expect, test } from "vitest";
import {
  parseNi,
  parseNlx,
  parseNr,
  parseNu,
  parseNun,
} from "../../sampleCode/C06/parse";

describe("parseNi", () => {
  const packages = ["react", "react-router-dom"];
  const parsedPackages = packages.join(" ");

  test("npm", () => {
    const agent = "npm";

    const result = parseNi(agent, packages);
    const resultWithEmptyPackages = parseNi(agent, []);

    expect(result).toBe(`npm i ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`npm i`);
  });

  test("yarn", () => {
    const agent = "yarn";

    const result = parseNi(agent, packages);
    const resultWithEmptyPackages = parseNi(agent, []);

    expect(result).toBe(`yarn add ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`yarn install`);
  });

  test("pnpm", () => {
    const agent = "pnpm";

    const result = parseNi(agent, packages);
    const resultWithEmptyPackages = parseNi(agent, []);

    expect(result).toBe(`pnpm add ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`pnpm i`);
  });
});

describe("parseNr", () => {
  const packages = ["react", "react-router-dom"];
  const parsedPackages = packages.join(" ");

  test("npm", () => {
    const agent = "npm";
    const parsedPackagesForNpm = packages.join(" -- ");

    const result = parseNr(agent, packages);
    const resultWithEmptyPackages = parseNr(agent, []);

    expect(result).toBe(`npm run ${parsedPackagesForNpm}`);
    expect(resultWithEmptyPackages).toBe(`npm run start`);
  });

  test("yarn", () => {
    const agent = "yarn";

    const result = parseNr(agent, packages);
    const resultWithEmptyPackages = parseNr(agent, []);

    expect(result).toBe(`yarn run ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`yarn run start`);
  });

  test("pnpm", () => {
    const agent = "pnpm";

    const result = parseNr(agent, packages);
    const resultWithEmptyPackages = parseNr(agent, []);

    expect(result).toBe(`pnpm run ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`pnpm run start`);
  });
});

describe("parseNu", () => {
  const packages = ["react", "react-router-dom"];
  const parsedPackages = packages.join(" ");

  test("npm", () => {
    const agent = "npm";

    const result = parseNu(agent, packages);
    const resultWithEmptyPackages = parseNu(agent, []);

    expect(result).toBe(`npm update ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`npm update`);
  });

  test("yarn", () => {
    const agent = "yarn";

    const result = parseNu(agent, packages);
    const resultWithEmptyPackages = parseNu(agent, []);

    expect(result).toBe(`yarn upgrade ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`yarn upgrade`);
  });

  test("pnpm", () => {
    const agent = "pnpm";

    const result = parseNu(agent, packages);
    const resultWithEmptyPackages = parseNu(agent, []);

    expect(result).toBe(`pnpm update ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`pnpm update`);
  });
});

describe("parseNun", () => {
  const packages = ["react", "react-router-dom"];
  const parsedPackages = packages.join(" ");

  test("npm", () => {
    const agent = "npm";

    const result = parseNun(agent, packages);
    const resultWithEmptyPackages = parseNun(agent, []);

    expect(result).toBe(`npm uninstall ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`npm uninstall`);
  });

  test("yarn", () => {
    const agent = "yarn";

    const result = parseNun(agent, packages);
    const resultWithEmptyPackages = parseNun(agent, []);

    expect(result).toBe(`yarn remove ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`yarn remove`);
  });

  test("pnpm", () => {
    const agent = "pnpm";

    const result = parseNun(agent, packages);
    const resultWithEmptyPackages = parseNun(agent, []);

    expect(result).toBe(`pnpm remove ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`pnpm remove`);
  });
});

describe("parseNlx", () => {
  const packages = ["react", "react-router-dom"];
  const parsedPackages = packages.join(" ");

  test("npm", () => {
    const agent = "npm";

    const result = parseNlx(agent, packages);
    const resultWithEmptyPackages = parseNlx(agent, []);

    expect(result).toBe(`npx ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`npx`);
  });

  test("yarn", () => {
    const agent = "yarn";

    const result = parseNlx(agent, packages);
    const resultWithEmptyPackages = parseNlx(agent, []);

    expect(result).toBe(`npx ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`npx`);
  });

  test("pnpm", () => {
    const agent = "pnpm";

    const result = parseNlx(agent, packages);
    const resultWithEmptyPackages = parseNlx(agent, []);

    expect(result).toBe(`pnpm dlx ${parsedPackages}`);
    expect(resultWithEmptyPackages).toBe(`pnpm dlx`);
  });
});
