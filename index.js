#!/usr/bin/env node

const {argv} = require('yargs');

/**
 * Program names which output is required in JSON
 * @type {String[]}
 */
const JSON_OUTPUT = [
	'files',
];

process.on('unhandledRejection', console.error); // eslint-disable-line no-console

/**
 * Entry point of CLI application
 */
(async() => {
	try {
		const {_: [prog]} = argv;

		const program = require(`./programs/${prog}`);
		const result = await program(argv);

		console.log( // eslint-disable-line no-console
			JSON_OUTPUT.includes(prog)
				?
				JSON.stringify(result, null, 2)
				:
				result
		);
	} catch (error) {
		console.error(error); // eslint-disable-line no-console
		process.exit(1);
	}
})();


