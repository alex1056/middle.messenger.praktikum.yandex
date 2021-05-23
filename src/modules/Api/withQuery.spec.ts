import 'mocha';
import { expect } from 'chai';

import { queryParams } from './index';

describe('queryParams', () => {
  it('простой объект', () => {
    const obj = { a: 1 };

    const result = queryParams(obj);

    expect(result).to.equal('a=1');
  });

  it('простые типы', () => {
    const obj = { a: 1, b: '2', c: true, d: false, e: null };

    const result = queryParams(obj);

    expect(result).to.equal('a=1&b=2&c=true&d=false&e=null');
  });

  it('undefined', () => {
    const obj = { a: undefined };

    const result = queryParams(obj);

    expect(result).to.equal('');
  });
});
