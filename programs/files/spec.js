const execute = require('async-execute');
const ext = filename => filename.split('.').pop();

describe('files', function() {
	this.timeout(5000);

	it('Should summarise file sizes', async () => {
		const result = await execute('./cli.js files --dir "./fixtures/files"');
		expect(() => JSON.parse(result)).not.to.throw();
	});

	it('Should exclude the directory path from file sizes', async () => {
		const result = await execute('./cli.js files --dir "./fixtures/files"');

		Object.keys(JSON.parse(result)).forEach(filename => {
			expect(filename).to.not.include('fixtures/files');
		})
	});

    it('Should exclude fingerprints from file names in file summary', async () => {
        const result = await execute('./cli.js files --dir "./fixtures/files/hashed_files"');

        Object.keys(JSON.parse(result)).forEach(filename => {
            expect(filename).to.not.include('998a22f8aa629b9f5441');
            expect(filename).to.not.include('57c5a8e01c4023125eae');
            expect(filename).to.match(/index.(js|css)$/);
        })
    });

	it('Should exclude the directory path from file sizes', async () => {
		{
			const result = await execute('./cli.js files --dir "./fixtures/files"');
			const filenames = Object.keys(JSON.parse(result));
			expect(filenames.map(ext)).to.include('jpg');
			expect(filenames.map(ext)).to.include('md');
		}
		{
			const result = await execute('./cli.js files --dir "./fixtures/files" --ignore ".md$"');
			const filenames = Object.keys(JSON.parse(result));
			expect(filenames.map(ext)).to.include('jpg');
			expect(filenames.map(ext)).to.not.include('md');
		}
	});

	it('Should accept multiple ignore patterns', async () => {
		{
			const result = await execute('./cli.js files --dir "./fixtures/files"');
			const filenames = Object.keys(JSON.parse(result));
			expect(filenames.map(ext)).to.include('jpg');
			expect(filenames.map(ext)).to.include('md');
		}
		{
			const result = await execute('./cli.js files --dir "./fixtures/files" --ignore ".md$" --ignore ".jpg$"');
			const filenames = Object.keys(JSON.parse(result));
			expect(filenames.map(ext)).to.not.include('jpg');
			expect(filenames.map(ext)).to.not.include('md');
		}
	});
});
