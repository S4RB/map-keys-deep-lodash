'use strict';

const _ = require('lodash');

const func = (obj, cb) => {
	if (_.isUndefined(obj)) {
		throw new Error(`Expected an object but got ${ typeof obj }`);
	}

	obj = _.mapKeys(obj, cb);

	const res = {};

	for (const key in obj) {
		if ({}.hasOwnProperty.call(obj, key)) {
			const val = obj[key];
			if (_.isObject(val)) {
				res[key] = func(val, cb);
			} else {
				res[key] = val;
			}
		}
	}

	return res;
};

module.exports = func;
