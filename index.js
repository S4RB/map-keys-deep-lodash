'use strict';

const _ = require('lodash');

const func = (obj, cb) => {
	if (_.isUndefined(obj)) {
		throw new Error(`Expected an object but got ${ typeof obj }`);
	}

	let res;

	if (_.isArray(obj)) {
		res = [];
	} else {
		obj = _.mapKeys(obj, cb);
		res = {};
	}

	for (const key in obj) {
		if ({}.hasOwnProperty.call(obj, key)) {
			const val = obj[key];

			if (_.isPlainObject(val) || _.isArray(val)) {
				res[key] = func(val, cb);
			} else {
				res[key] = val;
			}
		}
	}

	return res;
};

module.exports = func;
