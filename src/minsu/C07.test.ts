import { describe, expect, it, test } from "vitest"
import _ from "lodash"

type StringOrNumberOrObjectArray = Record<string, any>[]

describe("lodash_unionBy", () => {
  const unionByMock = (
    array1: StringOrNumberOrObjectArray,
    array2: StringOrNumberOrObjectArray,
    key: string,
  ) => {
    const newArray = [...array1, ...array2]
    const uniqueMap = new Map()

    for (const item of newArray) {
      const keyValue = item[key]
      if (!uniqueMap.has(keyValue)) {
        uniqueMap.set(keyValue, item)
      }
    }

    return Array.from(uniqueMap.values())
  }

  const array1 = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
    { x: 1, y: 4 },
  ]

  const array2 = [
    { x: 1, y: 4, c: 1 },
    { x: 5, y: 2, c: 4 },
  ]

  test("unionBy 메소드를 검증한다.", () => {
    const result = _.unionBy(array1, array2, "x")

    expect([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 2, c: 4 },
    ]).toEqual(result)
  })

  test("mock을 이용해서 unionBy메소드를 검증한다.", () => {
    const result = unionByMock(array1, array2, "x")
    expect(result).toEqual(_.unionBy(array1, array2, "x"))
  })

  test("unionBy메소드 의존성을 제외한 후 결과값 테스트", () => {
    const result = unionByMock(array1, array2, "x")
    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 2, c: 4 },
    ])
  })
})

describe("lodash_chunk", () => {
  const chuckMock = (array: number[], size: number) => {
    const chunkedArray = []
    let index = 0

    while (index < array.length) {
      chunkedArray.push(array.slice(index, index + size))
      index += size
    }

    return chunkedArray
  }

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  test("chuck 메소드를 검증한다.", () => {
    const result = _.chunk(array, 3)
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]])
  })

  test("mock을 이용해서 chuck메소드를 검증한다.", () => {
    const result = chuckMock(array, 3)
    expect(result).toEqual(_.chunk(array, 3))
  })

  test("chuck메소드 의존성을 제거한 후 테스트", () => {
    const result = chuckMock(array, 3)
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]])
  })
})
