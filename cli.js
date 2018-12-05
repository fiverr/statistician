#!/usr/bin/env node

const {argv} = require('yargs');

/**
 * Program names which output is required in JSON
 * @type {String[]}
 */
const JSON_OUTPUT = [
	'files',
];

process.on('unhandledRejection', console.error);

/**
 * Entry point of CLI application
 */
(async() => {
	try {
		const {_: [prog]} = argv;

		if (argv.v || argv.version) {
			return version();
		}

		const program = require(`./programs/${prog}/cli`);
		const result = await program(argv);

		result && console.log(
			JSON_OUTPUT.includes(prog)
				?
				JSON.stringify(result, null, 2)
				:
				result
		);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

function version() {
	const {name, version} = require('./package.json');

	console.log(name, version);
}
