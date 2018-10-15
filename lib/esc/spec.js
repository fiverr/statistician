const {expect} = require('chai');
const esc = require('.');

describe('esc', () => {
	it('Should add a backslash to characters that need escaping in markdown', () => {
		expect(esc('<root>something</root>')).to.equal('\\<root>something\\</root>');
	});
});
