'use strict';

const assert = require('assert'),
	expect = require('chai').expect;

const mapKeysDeep = require('./');

/* eslint-env mocha */

describe('It', () => {
	it('should work', () => {
		expect(() => {
			mapKeysDeep(void 0);
		}).to.throw('Expected an object but got undefined');

		const foo = mapKeysDeep({ a: 'b', c: 'd', e: { c: 'f', g: { c: 'h' } } }, (value, key) => {
			if (key === 'c') {
				return 'zzz';
			}
			return key;
		});
		assert.deepEqual(foo, { a: 'b', zzz: 'd', e: { zzz: 'f', g: { zzz: 'h' } } });

		const bar = mapKeysDeep({ a: { a: { a: 'b' } } }, (value, key) => {
			if (key === 'a') {
				return 'zzz';
			}
			return key;
		});
		assert.deepEqual(bar, { zzz: { zzz: { zzz: 'b' } } });
	});
});
