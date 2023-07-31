import { describe, expect, test } from 'vitest';
import clsx from 'clsx';

describe('clsx 테스트', () => {
  test('문자열 조합이 올바르게 출력되는가?', () => {
    const result = clsx('foo', true && 'bar', 'baz');
    expect(result).toBe('foo bar baz');
  });

  test('객체 조합이 올바르게 출력되는가?', () => {
    const isTrue = () => true;
    const result = clsx({ foo: true, bar: false, baz: isTrue() });
    expect(result).toBe('foo baz');
  });

  test('가변적인 객체 조합이 올바르게 출력되는가?', () => {
    const result = clsx({ foo: true }, { bar: false }, null, { '--foobar': 'hello' });
    expect(result).toBe('foo --foobar');
  });

  test('배열 조합이 올바르게 출력되는가?', () => {
    const result = clsx(['foo', 0, false, 'bar']);
    expect(result).toBe('foo bar');
  });

  test('가변적인 배열 조합이 올바르게 출력되는가?', () => {
    const result = clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
    expect(result).toBe('foo bar baz hello there');
  });

  test('다양한 타입의 값들이 올바르게 조합되는가?', () => {
    const result = clsx('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya');
    expect(result).toBe('foo bar hello world cya');
  });
});