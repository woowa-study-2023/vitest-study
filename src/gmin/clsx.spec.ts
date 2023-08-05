import { describe, expect, test } from 'vitest';
import clsx from 'clsx';

describe('clsx 테스트', () => {
  test('논리 연산자가 포함된 문자열 조합일 경우 논리 연산이 참일 때 문자열에 포함된다.', () => {
    const result = clsx('foo', true && 'bar', 'baz');
    expect(result).toBe('foo bar baz');
  });

  test('객체를 구성하는 value 중 함수가 있을 경우, 함수 반환값이 참일 때 key 값이 문자열에 포함된다. ', () => {
    const isTrue = () => true;
    const result = clsx({ foo: true, bar: false, baz: isTrue() });
    expect(result).toBe('foo baz');
  });

  test('객체의 value가 falsey한 값일 경우 해당 key 또는 값은 문자열에 포함되지 않는다. ', () => {
    const result = clsx({ foo: true }, { bar: false }, null, { '--foobar': 'hello' });
    expect(result).toBe('foo --foobar');
  });

  test('배열 요소 중 falsey 한 요소는 문자열에 포함되지 않는다.', () => {
    const result = clsx(['foo', 0, false, 'bar']);
    expect(result).toBe('foo bar');
  });

  test('각각의 배열, 중첩 배열 중 falsey 한 요소는 문자열에 포함되지 않는다.', () => {
    const result = clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
    expect(result).toBe('foo bar baz hello there');
  });

  test('배열, 문자열, 객체의 조합 중 falsey 한 요소는 문자열에 포함되지 않는다.', () => {
    const result = clsx('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya');
    expect(result).toBe('foo bar hello world cya');
  });
});