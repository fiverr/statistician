
describe('gzipSize', () => {
	let gzipSize;
	before(() => {
		const afsync = require('../afsync');
		afsync.readFile = content => Buffer.from(content);
		gzipSize = require('.');
	});
	after(() => {
		delete require.cache[require.resolve('../afsync')];
		delete require.cache[require.resolve('.')];
	});
	it('Should return a smaller gzipped size', async() => {
		const data = 'Lorem ipsum dolor sit amet, soleat adipisci omittantur te per, eos tacimates voluptatum te, vim an accusata posidonium. Quo sumo vitae in, sed et iracundia reformidans. Ne soluta perfecto phaedrum his. Eam mutat suscipiantur ne. Qui platonem convenire argumentum id. Cu erat consectetuer vim, doming aliquip fierent eu duo.\nPurto menandri te vis, dicta ullamcorper vix an. Est cu alii voluptatibus, simul commodo copiosae ad nec, expetenda euripidis ea ius. Ut vis imperdiet neglegentur, has modo disputando no. At tota consulatu dissentiet quo, mea an recteque definiebas, ei ullum quidam nostro vis.';
		expect(await gzipSize(data)).to.be.below(data.length)
	});
	it('Should have minimal gzipped filesize', async() => {
		const data = '';
		expect(await gzipSize(data)).to.be.above(data.length)
	});
});
