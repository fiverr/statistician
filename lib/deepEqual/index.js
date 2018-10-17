const {expect} = require('chai');

module.exports = function(before, after) {
	try {
		expect(before).to.deep.equal(after);
		return true;
	} catch (error) {
		return false;
	}
}
