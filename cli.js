#!/usr/bin/env node

const { resolve } = require('path');
const [,, ...args] = process.argv;
const argv = require('yargs-parser')(args);
const { name, version } = require('./package.json');

process.on('unhandledRejection', console.error);

/**
 * Entry point of CLI application
 */
(async() => {
	try {
		if (argv.v || argv.version) {
			console.log(name, version);
			return;
		}

		const program = getProgram(argv);
		const result = await program(argv);

		result && console.log(result);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

function getProgram({_: [program]}) {
	try {
		const route = resolve(`./programs/${program}/cli.js`);
		return require(route);
	} catch (error) {
		if (`${error.message}`.toLowerCase().includes('cannot find module')) {
			console.error(`Can not find program "${program}"`);
			console.error(error);
			process.exit(1);
		} else {
			throw error;
		}
	}
}
