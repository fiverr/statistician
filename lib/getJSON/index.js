const {readFile} = require('../afsync');

module.exports = async (file, def = {}) => {
	if (!file) {
		return {};
	}

	try {
		return JSON.parse((await readFile(file)).toString())
	} catch (error) {
		console.error(error); // eslint-disable-line no-console
		return def;
	}
}
