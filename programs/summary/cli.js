const program = require('.');
const getJSON = require('../../lib/getJSON');

/**
 * Create a document summarises files and bundles stats
 * @param  {String}  [options.file]   Route to file
 * @param  {String}  [options.bundle] Route to file
 * @param  {Boolean} [options.html]
 * @return {String}
 */
module.exports = async({file, bundle, html}) => await program({
	bundle: await getJSON(bundle, null),
	file: await getJSON(file, null),
	html,
});
