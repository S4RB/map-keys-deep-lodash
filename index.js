'use strict';

var _ = require('lodash');

var func = function (obj, cb) {
	if (_.isUndefined(obj)) {
		throw new Error('Expected an object but got ' + (typeof obj));
	}

	var res;

	if (_.isArray(obj)) {
		res = [];
	} else {
		obj = _.mapKeys(obj, cb);
		res = {};
	}

	for (var key in obj) {
		if ({}.hasOwnProperty.call(obj, key)) {
			var val = obj[key];

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
