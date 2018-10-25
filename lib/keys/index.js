module.exports = (...objects) => Array.from(
	new Set(
		objects.reduce(
			(arr, obj) => arr.concat(Object.keys(obj)),
			[]
		)
	)
);
