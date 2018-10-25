const chai = require('chai');
chai.use(require('chai-string'));
const {expect} = chai;
const markdown = require('.');

function total(obj, before, after) {
	return Object.defineProperty(
		obj,
		'__TOTAL_SIZE__', // Defining '__TOTAL_SIZE__' as a Non enumerable property
		{
			value: {before, after},
			enumerable: false,
		}
	);
}

describe('markdown', () => {
	let rows;
	beforeEach(() => {
		rows = [];
	});

	it('Should concatenate lines into the row or identical lines', () => {
		const modul = total({
			dep1: {before: {size: 1000}, after: {size: 2005}},
			dep2: {before: {size: 2000}, after: {size: 4990}},
		}, 1000, 2000);
		rows = markdown({root: modul});
		console.log(rows)
		expect(rows).to.have.lengthOf(1);
		expect(rows[0]).to.have.entriesCount('\n', 4);
	});

	it('Should drop the whole table when no dependencies are significantly changed', () => {
		const modul = total({
			dep1: {before: {size: 1000}, after: {size: 1005}},
			dep2: {before: {size: 2000}, after: {size: 1990}},
		}, 1000, 2000);
		rows = markdown({root: modul});
		expect(rows).to.have.lengthOf(0);
	});

	it('Should drop modules where total size is similar', () => {
		const modul = total({name: {}}, 1000, 1005);
		rows = markdown({root: modul});
		expect(rows).to.have.lengthOf(0);
	});

	it('Should drop the whole table when no dependencies are significantly changed', () => {
		const modul = total({
			dep1: {before: {size: 1000}, after: {size: 1005}},
			dep2: {before: {size: 2000}, after: {size: 1990}},
		}, 1000, 2000);
		rows = markdown({root: modul});
		expect(rows).to.have.lengthOf(0);
	});
});
