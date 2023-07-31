import {describe, expect, test} from "vitest";
import {chunk, unionBy} from 'lodash'

describe('lodash chuck', ()=>{
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
  test('size 대로 Array가 나누어지는가?', ()=>{
    const size = 3
    const chunkedArr = chunk(arr, size)
    expect(chunkedArr[0].length).toBe(size)

  })
  test('size로 나누어 떨어지지 않을 경우 ', ()=>{
    const size = 5
    const lastArrLength = arr.length%size
    const lastArrIndex = arr.length/size
    const chunkedArr = chunk(arr, size)
    expect(chunkedArr[lastArrIndex].length).toBe(lastArrLength)
  })
})
describe('lodash unionBy', ()=>{

  test('병합 시 중복 제거가 잘 되는가? ', ()=>{
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
    const unionedArr = unionBy(arr1, arr2, 'id');
    expect(unionedArr.length).toBe(4)
  })
})