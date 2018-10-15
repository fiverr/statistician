const {expect} = require('chai');

const {
	ignoreRules,
	matchRules,
	matchRule,
} = require('.');

describe('matches', () => {
	describe('ignoreRules', () => {
		it('Should convert string patterns to list of regexp rules', () => {
			expect(ignoreRules('\\w', '')).to.deep.equal([/\w/]);
		});
		it('Should use "gm" flags by default', () => {
			expect(ignoreRules('\\w')).to.deep.equal([/\w/gm]);
		});
		it('Should convert all items in list', () => {
			expect(ignoreRules(['\\w', '\\d'], '')).to.deep.equal([/\w/, /\d/]);
		});
		it('Should default to an empty array', () => {
			expect(ignoreRules()).to.deep.equal([]);
			expect(ignoreRules(null)).to.deep.equal([]);
			expect(ignoreRules(67)).to.deep.equal([]);
		});
	});

	describe('matchRule', () => {
		it('Should test regexp rule', () => {
			expect(
				matchRule('.gitignore', /^\./)
			).to.be.true;

			expect(
				matchRule('something', /^\./)
			).to.be.false;
		});
		it('Should test using rule function', () => {
			let called = false;
			const thing = 'a thing';
			matchRule(thing, thang => {
				expect(thang).to.equal(thing);
				called = true;
			});
			expect(called).to.be.true;

			expect(
				matchRule(null, () => true)
			).to.be.true;
			expect(
				matchRule(null, () => false)
			).to.be.false;
		});
		it('Should test other things absolutely completely', () => {
			const obj = {};
			expect(
				matchRule('hello', 'hello')
			).to.be.true;
			expect(
				matchRule(1, 1)
			).to.be.true;
			expect(
				matchRule(obj, obj)
			).to.be.true;

			expect(
				matchRule('hello1', 'hello')
			).to.be.false;
			expect(
				matchRule('lib/hello', 'hello')
			).to.be.false;
			expect(
				matchRule({}, {})
			).to.be.false;
		});
	});

	describe('matchRules', () => {
		it('Should exit after one match', () => {
			let i = 0;
			matchRules('lib/hello', [
				() => { ++i; return false; },
				() => { ++i; return false; },
				() => { ++i; return true; },
				() => { ++i; return false; },
			]);

			expect(i).to.equal(3);
		});
	});
});
