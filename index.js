#!/usr/bin/env node

/* eslint no-console: 0 */

const {argv} = require('yargs');
const {name, version} = require('./package.json');

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
			console.log(name, version);
			return;
		}

		const program = require(`./programs/${prog}/cli`);
		const result = await program(argv);

		console.log(
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


